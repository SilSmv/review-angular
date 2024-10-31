import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItems } from '../../models/cartItems';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @Input() items: CartItems[] = [];

  @Output() idProductEventEmitter = new EventEmitter ();

  onDeleteCart(id:number){
    this.idProductEventEmitter.emit(id);

  }




}
