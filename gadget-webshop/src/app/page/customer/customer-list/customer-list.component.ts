import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Alignment } from 'src/app/model/alignment';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {

  customers$: Observable<Customer[]> = this.customerService.getAll()

  /* {
    "id": 1,
    "firstName": "Ilka",
    "lastName": "Perschke",
    "email": "iperschke0@slideshare.net",
    "address": {
      "id": 0,
      "zip": 3136,
      "country": "",
      "city": "",
      "street": "Pepper Wood Hill",
      "notes": ""
    },
    "active": true
  } */

  public columnDefinition: ColumnDefinition[] = [
    new ColumnDefinition({
      title: 'ID',
      column: 'id',
    }),
    new ColumnDefinition({
      title: 'First name',
      column: 'firstName',
    }),
    new ColumnDefinition({
      title: 'Last name',
      column: 'lastName',
    }),
    new ColumnDefinition({
      title: 'Email',
      column: 'email',
    }),

    new ColumnDefinition({
      title: 'ZIP',
      column: 'address',
      subcolumn: 'zip',
      sortable: false
    }),
    new ColumnDefinition({
      title: 'Street',
      column: 'address',
      subcolumn: 'street',
      sortable: false
    }),

    new ColumnDefinition({
      title: 'Active',
      column: 'active',
      alignment: Alignment.center
    })
  ];

  constructor(
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {}

  onCustomButtonClicked(evt: CustomButtonEvent) {
    console.log(evt);
  }
}
