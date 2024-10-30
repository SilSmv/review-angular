import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hola mundo angular';
  users: string[] =['Andres','Eduardo','Andrea'];
  // users!: string[] 

  visible:boolean = false;
  setVisible():void{
    this.visible = !this.visible;
  }
}
