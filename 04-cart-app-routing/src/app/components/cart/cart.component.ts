import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItems } from '../../models/cartItems';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnChanges{

  @Input() items: CartItems[] = [];
  @Input() total = 0; 
  @Output() idProductEventEmitter = new EventEmitter ();

  ngOnChanges(changes: SimpleChanges): void {
    let itemsChanges = changes['items'];
    this.calculateTotal();
    this.saveSession();
    // if(itemsChanges.firstChange){
    //   this.saveSession();
    // }
  }
  onDeleteCart(id:number){
    this.idProductEventEmitter.emit(id);

  }
  calculateTotal():void{
    this.total = this.items.reduce((accumulator,item)=>accumulator + item.quantity*item.product.price,0)
  }

  saveSession():void{
    sessionStorage.setItem('cart',JSON.stringify(this.items))
  }



}
