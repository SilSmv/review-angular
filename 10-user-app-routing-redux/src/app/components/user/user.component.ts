import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { load, remove } from '../../store/users/users.action';
import Swal from 'sweetalert2';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule,PaginatorComponent],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{
  title: string = 'Listado de usuarios';
  pageUrl= '/users/page';
  users:User[] = []
  paginator:any = {}
  loading:boolean=true;


  constructor(private router:Router,
    private authService:AuthService,
    private store: Store<{users:any}>,
  private route:ActivatedRoute){
    this.store.select('users').subscribe(state => {
      this.users = state.users;
      this.paginator = state.paginator
      this.loading = state.loading
    })
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>this.store.dispatch(load({page:+(params.get('page')|| '0')}))
    )

  }

  onRemoveUser(id:number): void{
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
        this.store.dispatch(remove({id}))
      }
    });



  }
  onSelectedUser(user:User):void{
    this.router.navigate(['/users/edit',user.id],{state:{user}});
  }
  get admin(){
    return this.authService.isAdmin();
  }

}
