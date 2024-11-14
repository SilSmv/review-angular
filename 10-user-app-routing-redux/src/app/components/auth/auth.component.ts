import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  user:User;

  constructor(private authService:AuthService, private router:Router){
    this.user = new User();
  }

  onSubmit(){
    if(!this.user.username || ! this.user.password){
      Swal.fire('Error de validacion', 'Username y password requeridos', 'error')
    }else{
      this.authService.loginUser({username:this.user.username,password:this.user.password}).subscribe({
        next: response => {
          const token = response.token;
          const payload = this.authService.getPayload(token);
          this.authService.token = token;
          this.authService.user = {
            user:{username: payload.sub},
            isAuth: true,
            isAdmin:payload.isAdmin
          };

          this.router.navigate(['/users/page/0'])
          console.log(payload)
        },
        error: error =>{
          if(error.status ==401){
            Swal.fire('Error en el Login',error.error.message,'error')
          }else{
            throw error;
          }

        }
      })
    }
  }

}
