import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { add, find, resetUser, update } from '../../store/users/users.action';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit{
  user:User;
  error: any ={};



  constructor(
    private route: ActivatedRoute,
    private store: Store<{users:any}>
  ){
      this.user = new User();
      this.store.select('users').subscribe(state  => {
        this.error = state.errors;
        this.user = {...state.user}
      })
  }
  ngOnInit(): void {
    this.store.dispatch(resetUser())

    this.route.paramMap.subscribe(param => {
      const id: number = +(param.get('id')||'0')
      if(id>0){
        this.store.dispatch(find({id}));
      }
    })
  }

  onSubmit(userForm: NgForm):void{
    if(this.user.id > 0 ){
      this.store.dispatch(update({userUpdated: this.user}))

    }else{
      this.store.dispatch(add({userNew: this.user}))

    }
  }
  onClear(userForm:NgForm
  ){
    this.store.dispatch(resetUser())
    userForm.reset();
    userForm.resetForm();
  }

}
