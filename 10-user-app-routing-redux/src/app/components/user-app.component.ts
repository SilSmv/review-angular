import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import Swal from 'sweetalert2';
import {  Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent {





}
