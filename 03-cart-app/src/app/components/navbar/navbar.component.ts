import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItems } from '../../models/cartItems';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() items:CartItems[] = [];

  @Output() openEventEmitter= new EventEmitter();

openCart(): void{
  this.openEventEmitter.emit()
}

}
