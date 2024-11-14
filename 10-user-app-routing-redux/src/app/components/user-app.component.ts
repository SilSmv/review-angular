import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { remove } from '../store/users.action';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit{
  title: string = 'Listado de usuarios';
  user!: User;

  constructor(
    private sharingData: SharingDataService,
    private router:Router,
    private authService: AuthService,
    private store: Store<{users:any}>
  ){
    this.store.select('users').subscribe(state =>{
      this.user = {...state.user}
    })


  }
  ngOnInit(): void {

    this.handlerLogin();
    
  }

  handlerLogin(){
    this.sharingData.handlerLonginEventEmitter.subscribe(({username, password}) =>{
      console.log(username + ' '  + password)

      this.authService.loginUser({username,password}).subscribe({
        next: response => {
          const token = response.token;
          const payload = this.authService.getPayload(token);

          const user ={username: payload.sub}
          const login = {
            user,
            isAuth: true,
            isAdmin:payload.isAdmin
          }
          this.authService.token = token;
          this.authService.user = login;

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
    })

  }



}
