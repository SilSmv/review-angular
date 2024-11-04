import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { load } from '../../store/products.actions';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
   products!: Product[]


constructor(
  private store:Store<{products:any}>,
            private sharingDataService:SharingDataService)
            {
  // if(this.router.getCurrentNavigation()?.extras.state){
  //   this.products = this.router.getCurrentNavigation()?.extras.state!['products']
  // }
  this.store.select('products').subscribe(state => this.products = state.products)


}
  ngOnInit(): void {
  this.store.dispatch(load());
  }

  onAddCart(product:Product){
    this.sharingDataService.productEventEmitter.emit(product)

  }

}
