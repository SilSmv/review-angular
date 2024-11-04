import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CartItems } from '../../models/cartItems';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ItemsState } from '../../store/items.reducer';
import { Store } from '@ngrx/store';
import { total } from '../../store/items.actions';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent  implements OnInit{

  items: CartItems[] = [];
  total = 0; 
  idProductEventEmitter = new EventEmitter ();

  constructor(
    private store:Store<{items:ItemsState}>,
    private sharingDataService: SharingDataService, 
    private router:Router){
    this.store.select('items').subscribe(state =>{
      this.items = state.items
      this.total = state.total

    })

  }
  ngOnInit(): void {
    this.store.dispatch(total())
  }
  onDeleteCart(id:number){
    this.sharingDataService.idProductEventEmitter.emit(id);

  }

}
