import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
})
export class CounterComponent implements OnInit {
  counter: number = 0;
  @Input() title!:string;

  @Output () counterEmmit: EventEmitter<number> = new EventEmitter ();

  ngOnInit(): void {
    // Sesion que caada que se cierra la ventana se reinicia 
    this.counter = sessionStorage.getItem('counter')!= undefined ? parseInt(sessionStorage.getItem('counter')!) : 0;
    //A pesar de cerrar la ventana el valor persiste
    // this.counter = parseInt(localStorage.getItem('counter')!) || 0;
  }

  
  setCounter():void{
    this.counter = this.counter +1;
    sessionStorage.setItem('counter',this.counter.toString())
    this.counterEmmit.emit(this.counter);
  }

}
