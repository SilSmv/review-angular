import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users :User[]=[
    {
      id:1,
      name: 'Andres',
      lastname: 'Guzman',
      email: 'andres@gmail.com',
      username: 'andres',
      password:'1234567'
    },
    {
      id:2,
      name: 'Josefa',
      lastname: 'Doe',
      email: 'pepa.dow@gmail.com',
      username: 'pepa',
      password:'1234567'
    }
  ]

  constructor() { }

  findAll():Observable<User[]>{
    return of(this.users);
  }
}
