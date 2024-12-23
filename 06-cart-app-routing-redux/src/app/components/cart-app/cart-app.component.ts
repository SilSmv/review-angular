import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CatalogComponent } from "../catalog/catalog.component";
import { CartItems } from '../../models/cartItems';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { add, remove, total } from '../../store/items.actions';



@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent,NavbarComponent,RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit{

  items:CartItems[] = [];
  showCart:boolean = false;

  constructor(
    private store:Store<{items:ItemsState}>,
    private router: Router,
    private service:ProductService,
    private sharingDataService: SharingDataService){
      this.store.select('items').subscribe(state => {
        this.items = state.items;
        this.saveSession();
        console.log('Cambio el estaado ')
      })


  }

  ngOnInit(): void {
    this.onDeleteCart()
    this.onAddCart();
  }

  onAddCart(){
    this.sharingDataService.productEventEmitter.subscribe(product =>{
      this.store.dispatch(add({product}));
      this.store.dispatch(total())
      this.router.navigate(
        ['/cart']
      )
      Swal.fire({
        title: "Shooping Cart",
        text: "Nuevo producto agregado al carro!",
        icon: "success"
      });
    } )
  }


  onDeleteCart():void{

    this.sharingDataService.idProductEventEmitter.subscribe(id =>{
      Swal.fire({
        title: "Esta seguro que desea eliminar?",
        text: "Cuidado el item se eliminara del carro de compras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si,eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {

          this.store.dispatch(remove({id: id}))
          this.store.dispatch(total())
          if(this.items.length === 0 ){
            sessionStorage.removeItem('cart');
            sessionStorage.clear();
          }
          this.router.navigateByUrl('/',{skipLocationChange:true}).then(() =>{
            this.router.navigate(
              ['/cart']
            )
          })



          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el carro de compraas.",
            icon: "success"
          });
        }
      });
      


    

    })
 
  }


  saveSession():void{
    sessionStorage.setItem('cart',JSON.stringify(this.items))
  }
  openCart(){
    this.showCart= !this.showCart
  }

}
