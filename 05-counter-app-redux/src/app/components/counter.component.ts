import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment,decrement,reset } from '../store/items.action';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  title:String = 'Counter usando redux'
  counter: number = 0;
  constructor(private store:Store<{counter:number}>){
    // this.counter=0;
    // El valor en counter tiene que coincidir con el nombre en el app.config
    this.store.select('counter').subscribe(counter =>{
      this.counter = counter;
    })
  }

  increment():void{
    // this.counter++;
    this.store.dispatch(increment())
  console.log('incrementando...')
}
decrement():void{
  // this.counter--;
  this.store.dispatch(decrement())
  console.log('decrementando...')
}
reset():void{
  // this.counter=0
  this.store.dispatch(reset())
  console.log('reset...')
}
}
