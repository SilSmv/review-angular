import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { NgFor } from '@angular/common';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  user:User;

  @Output() newUserEventEmitter:EventEmitter<User> = new EventEmitter();

  constructor(){
    this.user = new User();
  }

  onSubmit(userForm: NgForm):void{

    if(userForm.valid){
      this.newUserEventEmitter.emit(this.user)
      console.log(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

}