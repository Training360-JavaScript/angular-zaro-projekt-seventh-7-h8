import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, Observable, map, forkJoin, of } from 'rxjs';
import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { BaseNetworkService } from './base-network.service';
import { CustomerService } from './customer.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseNetworkService<Order> {

  constructor(
    public override http: HttpClient,
    private customerService: CustomerService,
    private productService: ProductService
  ) {
    super(http);
    this.endpoint = 'order';
  }

  getCustomerByOrder(customerId: number): Observable<Customer> {
    return this.customerService.get(customerId);
  }

  getProductByOrder(productID: number): Observable<Product> {
    return this.productService.get(productID);
  }

  override getAll(): Observable<Order[]> {
    const allOrder$ = super.getAll();
    const allCustomer$ = this.customerService.getAll();
    const allProduct$ = this.productService.getAll();

    return forkJoin([allOrder$, allCustomer$, allProduct$]).pipe(
      map(responses => {
        responses[0].forEach((order, id) => {
          const customer = responses[1].find(customer => customer.id === order.customerID) || new Customer();
          const product = responses[2].find(product => product.id === order.productID) || new Product();
          order.customer = customer;
          order.product = product;
          responses[0][id] = this.flattenResponse(order);
        })
        return responses[0];
      })
    )
  }

  override get(id: number): Observable<Order> {
    return super.get(id).pipe(
      switchMap(OrderData => {
        if (OrderData === null) return of(OrderData) as unknown as Observable<Order>;
        return this.getCustomerByOrder(OrderData.id).pipe(
          map(cust => {
            OrderData.customer = cust;
            return OrderData;
          })
        )
      }),
      switchMap(OrderData => {
        if (OrderData === null) return of(OrderData) as unknown as Observable<Order>;
        return this.getProductByOrder(OrderData.id).pipe(
          map(prod => {
            OrderData.product = prod;
            return this.flattenResponse(OrderData);
          })
        )
      })
    );
  }

  getOrdersByProductId(productId: number): Observable<Order[]> {
    return super.getAll().pipe(
      map(orders => orders.filter(order => order.productID === productId))
    );
  }

}
