import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss'],
})
export class BillListComponent implements OnInit {
  bills: any[] = [
    { id: 1, orderID: 598, amount: 904, status: 'new' },
    { id: 2, orderID: 485, amount: 256, status: 'new' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
