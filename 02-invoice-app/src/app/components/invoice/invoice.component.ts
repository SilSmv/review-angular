import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { ClientViewComponent } from '../client-view/client-view.component';
import { CompanyViewComponent } from '../company-view/company-view.component';
import { ListItemsComponent } from '../list-items/list-items.component';
import { RowItemComponent } from '../row-item/row-item.component';
import { InvoiceViewComponent } from '../invoice-view/invoice-view.component';
import { TotalComponent } from '../total/total.component';
import { FormItemComponent } from '../form-item/form-item.component';
import { isNgContent } from '@angular/compiler';
import { Item } from '../../models/item';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [InvoiceComponent, 
    ClientViewComponent, 
    CompanyViewComponent, 
    ListItemsComponent, 
    InvoiceViewComponent, 
    FormItemComponent,
  TotalComponent],
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent  implements OnInit{
  invoice!: Invoice;
  @Output() removeEventEmitter:EventEmitter<number> = new EventEmitter();
  removeItem(id: number){
    this.invoice = this.service.remove(id)
  }
  addItem(item:Item){
    this.invoice = this.service.save(item)
  }
  constructor(private service: InvoiceService){

  }
  ngOnInit(): void {
    this.invoice = this.service.getInvoice();
  }

}
