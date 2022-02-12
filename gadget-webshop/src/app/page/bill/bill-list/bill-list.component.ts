import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/model/bill';
import { Status } from 'src/app/model/status';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss'],
})
export class BillListComponent implements OnInit {
  bills: Bill[] = [
    { id: 1, orderID: 598, amount: 904, status: Status.new },
    { id: 2, orderID: 485, amount: 256, status: Status.new },
  ];
  constructor() {}

  ngOnInit(): void {}
}
