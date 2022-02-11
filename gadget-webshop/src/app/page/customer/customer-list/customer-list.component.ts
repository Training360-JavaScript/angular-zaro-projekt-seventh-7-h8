import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [
    {
      id: 1,
      firstName: 'Ilka',
      lastName: 'Perschke',
      email: 'iperschke0@slideshare.net',
      address: '3136 Pepper Wood Hill',
      active: true,
    },
    {
      id: 2,
      firstName: 'Waylon',
      lastName: 'Leavens',
      email: 'wleavens1@mapy.cz',
      address: '55839 Lakewood Gardens Drive',
      active: true,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
