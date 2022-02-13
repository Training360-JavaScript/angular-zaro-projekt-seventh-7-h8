import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Bill } from '../model/bill';
import { Order } from '../model/order';
import { BaseNetworkService } from './base-network.service';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseNetworkService<Bill>{

  constructor(
    public override http: HttpClient,
    private orderService: OrderService
  ) {
    super(http);
    this.endpoint = 'bill';
  }

  getOrderByBillId(id: number): Observable<Order> {
    return this.orderService.get(id);
  }

  override getAll(): Observable<Bill[]> {
    const allBills$ = super.getAll();
    const allOrders$ = this.orderService.getAll();

    return forkJoin([allBills$, allOrders$]).pipe(
      map(responses => {
        responses[0].forEach(bill => {
          const order = responses[1].find(orderItem => orderItem.id === bill.orderID) || new Order();
          bill.order = order;
        })
        return responses[0];
      })
    )
  }

  override get(id: number): Observable<Bill> {
    return super.get(id).pipe(
      switchMap(BillData => {
        return this.getOrderByBillId(BillData.id).pipe(
          map(order => {
            BillData.order = order;
            return BillData;
          })
        )
      })
    );
  }
}
