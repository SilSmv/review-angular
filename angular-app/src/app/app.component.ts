import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from "./counter/counter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'Hola mundo angular';
  subTitle = 'Contador con estado de session'
  users: string[] =['Andres','Eduardo','Andrea'];
  // users!: string[] 

  visible:boolean = false;

  counter:number = 0;
  ngOnInit(): void {
    this.counter = parseInt(sessionStorage.getItem('counter')!) || 0;
  }
  setVisible():void{
    this.visible = !this.visible;
  }
  setCounter(event:number):void {
    this.counter = event;
  }
}
