import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Alignment } from 'src/app/model/alignment';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {

  order$: Observable<Order[]> = this.orderService.getAll();

  public columnDefinition: ColumnDefinition[] = [
    new ColumnDefinition({
      title: 'ID',
      column: 'id',
    }),
    new ColumnDefinition({
      title: 'Client Firstname',
      column: 'customer.firstName',
    }),
    new ColumnDefinition({
      title: 'Client Lastname',
      column: 'customer.lastName',
    }),
    new ColumnDefinition({
      title: 'Product',
      column: 'product.name',
    }),
    new ColumnDefinition({
      title: 'Amount',
      column: 'amount',
      alignment: Alignment.right
    }),
    new ColumnDefinition({
      title: 'Price',
      column: 'product.price',
      alignment: Alignment.right
    }),
    new ColumnDefinition({
      title: 'Status',
      column: 'status',
      alignment: Alignment.center
    }),
  ];
  //TODO:: Shold define calculated columns, like amount * price = sumprice

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {}

  onCustomButtonClicked(evt: CustomButtonEvent) {
    console.log(evt);
  }

}
