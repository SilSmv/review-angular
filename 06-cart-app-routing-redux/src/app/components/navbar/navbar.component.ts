import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItems } from '../../models/cartItems';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() items:CartItems[] = [];
  @Input() total:Number = 0;

}
