import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { add, find, findAll, remove, setPaginator, update } from '../store/users.action';

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
    private service: UserService,
    private sharingData: SharingDataService,
    private router:Router,
    private route:ActivatedRoute,
    private authService: AuthService,
    private store: Store<{users:any}>
  ){
    this.store.select('users').subscribe(state =>{
      this.user = {...state.user}
    })


  }
  ngOnInit(): void {
    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUsersEvent();
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

  pageUsersEvent(){
    this.sharingData.pageUsersEventEmitter.subscribe(pageable =>{
      // this.users = pageable.users;
      // this.paginator = pageable; 
      this.store.dispatch(findAll({users: pageable.users}))
      this.store.dispatch(setPaginator({paginator: pageable.paginator}))
    })
  }

  findUserById(){
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      this.store.dispatch(find({id}))
      this.sharingData.selectUserEventEmitter.emit(this.user);
    })

  }
  addUser(){
    this.sharingData.newUserEventEmitter.subscribe(user=>{
      if(user.id>0){
        this.service.update(user).subscribe(
        {next: (userUpdated) => {
          // this.users = this.users.map(u => (u.id === userUpdated.id)?{... userUpdated}:u)
          this.store.dispatch(update({userUpdated}));
          
        },
      error: (err) =>{
        if(err.status ==400){
          this.sharingData.errorEventEmitter.emit(err.error);
        }

      }})
        
        
      }else{
        this.service.create(user).subscribe(
          {next:(userNew) => {
          this.store.dispatch(add({userNew}));
          this.router.navigate(['/users']);
          Swal.fire({
            title: "Guardado!",
            text: "Se ha guardado el elemento!",
            icon: "success"
          });
          },
          error: (err) =>{
            if(err.status ==400){
              this.sharingData.errorEventEmitter.emit(err.error);
            }

    
          }
        }        )
        
      }



    })
  
  }
  removeUser(){
    this.sharingData.idUserEventEmitter.subscribe(id =>{

      Swal.fire({
        title: "Esta seguro que quiere eliminar?",
        text: "Cuidado el dato del sistema sera eliminado!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service.remove(id).subscribe(() =>{
            // this.users = this.users.filter(user => user.id!==id);
            this.store.dispatch(remove({id}))
            this.router.navigate(['/users/create'],{skipLocationChange:true}).then(() =>{
              this.router.navigate(['/users'],);
            })

          });


          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con exito .",
            icon: "success"
          });
        }
      });

    })
   

 
  }


}
