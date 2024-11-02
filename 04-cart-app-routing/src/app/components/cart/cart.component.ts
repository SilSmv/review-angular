import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItems } from '../../models/cartItems';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {

  items: CartItems[] = [];
  total = 0; 
  idProductEventEmitter = new EventEmitter ();

  constructor(private sharingDataService: SharingDataService, private router:Router){
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }
  onDeleteCart(id:number){
    this.sharingDataService.idProductEventEmitter.emit(id);

  }

}
