import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Alignment } from 'src/app/model/alignment';
import { Bill } from 'src/app/model/bill';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';
import { Status } from 'src/app/model/status';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss'],
})
export class BillListComponent implements OnInit {


  billList$: Observable<Bill[]> = this.billService.getAll();

  public columnDefinition: ColumnDefinition[] = [
    new ColumnDefinition({
      title: 'ID',
      column: 'id',
    }),
    new ColumnDefinition({
      title: 'Order Id',
      column: 'orderID',
      alignment: Alignment.right
    }),
    new ColumnDefinition({
      title: 'Status',
      column: 'status',
    }),
    new ColumnDefinition({
      title: 'FirstName',
      column: 'order.customer.firstName',
    }),
    new ColumnDefinition({
      title: 'LastName',
      column: 'order.customer.lastName',
    }),
    new ColumnDefinition({
      title: 'Product',
      column: 'order.product.name',
      sortable: false
    }),
    new ColumnDefinition({
      title: 'Price',
      column: 'order.product.price',
      alignment: Alignment.right
    }),
    new ColumnDefinition({
      title: 'Amount',
      column: 'amount',
      alignment: Alignment.right
    }),
  ];


  constructor(
    private billService: BillService
  ) {}

  ngOnInit(): void {}


  onCustomButtonClicked(evt: CustomButtonEvent) {
    console.log(evt);
  }
}
