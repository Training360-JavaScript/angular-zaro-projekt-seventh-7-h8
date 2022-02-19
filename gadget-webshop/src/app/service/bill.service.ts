import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
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

  getBillByOrderId(orderID: number): Observable<Bill[]> {
    return super.getAll().pipe(
      map(bills => bills.filter(bill => bill.orderID === orderID))
    );
  }

  override getAll(): Observable<Bill[]> {
    const allBills$ = super.getAll();
    const allOrders$ = this.orderService.getAll();

    return forkJoin([allBills$, allOrders$]).pipe(
      map(responses => {
        responses[0].forEach((bill, id) => {
          const order = responses[1].find(orderItem => orderItem.id === bill.orderID) || new Order();
          bill.order = order;
          responses[0][id] = this.flattenResponse(bill);
        })
        return responses[0];
      })
    )
  }

  override get(id: number): Observable<Bill> {
    return super.get(id).pipe(
      switchMap(BillData => {
        if (BillData === null) return of(BillData) as unknown as Observable<Bill>;
        return this.getOrderByBillId(BillData.orderID).pipe(
          map(order => {
            BillData.order = order;
            return this.flattenResponse(BillData);
          })
        )
      })
    );
  }
}
