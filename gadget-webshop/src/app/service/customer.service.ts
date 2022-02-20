import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Address } from '../model/address';
import { Customer } from '../model/customer';
import { BaseNetworkService } from './base-network.service';
@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseNetworkService<Customer> {

  constructor(
    public override http: HttpClient,
  ) {
    super(http);
    this.endpoint = 'customer';
  }

  createAddress(customer: Customer): Customer {
    if (!customer) return customer;
      try {
        customer.address = JSON.parse(`${customer.address}`);
      } catch (e) {
        customer.address = new Address();
      }

      return customer;
  }

  override getAll(): Observable<Customer[]> {
    return super.getAll().pipe(
      map(customerList => {
        return customerList.map(customer => this.flattenResponse(this.createAddress(customer)));
      }),
    );
  }

  override get(id: number): Observable<Customer> {
    return super.get(id).pipe(
      map(customer => this.flattenResponse(this.createAddress(customer)) )
    );
  }

}
