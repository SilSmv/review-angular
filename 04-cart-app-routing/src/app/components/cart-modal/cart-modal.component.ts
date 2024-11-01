import { Component,EventEmitter,Input,Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItems } from '../../models/cartItems';

@Component({
  selector: 'cart-modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',
})
export class CartModalComponent {
  @Input() items: CartItems[] = [];
  // @Input() total = 0; 
  @Output() idProductEventEmitter = new EventEmitter ();
  @Output() closeEventEmitter= new EventEmitter();

 closeCart(): void{
    this.closeEventEmitter.emit()
  }

  onDeleteCart(id:number){
    this.idProductEventEmitter.emit(id);

  }

}
