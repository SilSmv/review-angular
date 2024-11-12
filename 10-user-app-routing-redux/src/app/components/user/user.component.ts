import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';

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


  constructor(private sharingData: SharingDataService,
    private service: UserService, private router:Router,
    private authService:AuthService,
  private route:ActivatedRoute){
    if(this.router.getCurrentNavigation()?.extras.state){
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
    // else{
    //   this.service.findAll().subscribe(users => this.users = users)
    // }
  }
  ngOnInit(): void {
    console.log('Cosulta al backend')
    if(this.users ===undefined || this.users ==null || this.users.length == 0 ){
      // this.service.findAll().subscribe(users => this.users = users)
      this.route.paramMap.subscribe(params =>{
        const page = +(params.get('page')|| '0')
        this.service.findAllPageable(page).subscribe(pageable  => {
          this.users = pageable.content as User[]
          this.paginator = pageable;
          this.sharingData.pageUsersEventEmitter.emit({users:this.users,paginator:this.paginator})})
          
      })
    }

  }

  onRemoveUser(id:number): void{
     this.sharingData.idUserEventEmitter.emit(id)


  }
  onSelectedUser(user:User):void{
    this.router.navigate(['/users/edit',user.id],{state:{user}});
  }
  get admin(){
    return this.authService.isAdmin();
  }

}
