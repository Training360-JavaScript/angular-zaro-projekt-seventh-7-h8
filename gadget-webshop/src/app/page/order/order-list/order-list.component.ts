import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders: any[] = [
    { id: 1, customerID: 476, productID: 973, amount: 9, status: 'new' },
    { id: 2, customerID: 444, productID: 777, amount: 9, status: 'shipped' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
