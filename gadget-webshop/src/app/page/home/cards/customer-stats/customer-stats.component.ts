import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-customer-stats',
  templateUrl: './customer-stats.component.html',
  styleUrls: ['./customer-stats.component.scss']
})
export class CustomerStatsComponent implements OnInit {

  @Input() customers: Customer[] = [];

  public allCustomers: number = 0;
  public activeCustomer: number = 0;
  public displayClients: Customer[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.customers);
    this.allCustomers = this.customers.length;
    this.activeCustomer = this.customers.filter(customer => customer.active).length;
    this.displayClients = this.customers.sort(({id: a}, {id: b}) => a-b).slice(0, 5);
  }

}
