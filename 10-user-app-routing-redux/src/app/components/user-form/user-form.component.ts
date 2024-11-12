import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { NgFor } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit{
  user:User;
  error: any ={};



  constructor(private sharingData: SharingDataService,
    private service:UserService,
    private route: ActivatedRoute
  ){
      this.user = new User();
  }
  ngOnInit(): void {
    this.sharingData.errorEventEmitter.subscribe(error => this.error = error)
    this.sharingData.selectUserEventEmitter.subscribe(user => this.user = user);



    this.route.paramMap.subscribe(param => {
      const id: number = +(param.get('id')||'0')
      if(id>0){
        this.sharingData.findUserByIdEventEmitter.emit(id);

        this.service.findById(id).subscribe( user => this.user = user)

      }
    })
  }

  onSubmit(userForm: NgForm):void{

    // if(userForm.valid){
      this.sharingData.newUserEventEmitter.emit(this.user)
    //   console.log(this.user);
    // }
    // userForm.reset();
    // userForm.resetForm();
  }
  onClear(userForm:NgForm
  ){
    // this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

}
