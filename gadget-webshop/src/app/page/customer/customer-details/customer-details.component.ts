import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Alignment } from 'src/app/model/alignment';
import { ButtonDefinition } from 'src/app/model/button-definition';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  public customer!: Customer;
  public allOrders!: Order[];

  id: Observable<number> = this.activatedRoute.params.pipe(
    map(params => parseInt(params['id']))
  );

  public columnDefinition: ColumnDefinition[] = [
    new ColumnDefinition({
      title: 'ID',
      column: 'id',
    }),
    new ColumnDefinition({
      title: 'Client Firstname',
      column: 'customer.firstName',
    }),
    new ColumnDefinition({
      title: 'Client Lastname',
      column: 'customer.lastName',
    }),
    new ColumnDefinition({
      title: 'Product',
      column: 'product.name',
    }),
    new ColumnDefinition({
      title: 'Amount',
      column: 'amount',
      alignment: Alignment.right
    }),
    new ColumnDefinition({
      title: 'Price',
      column: 'product.price',
      alignment: Alignment.right
    }),
    new ColumnDefinition({
      title: 'Status',
      column: 'status',
      alignment: Alignment.center
    }),
  ];

  public actionButtons: ButtonDefinition[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private orderService: OrderService,
    private router:Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id.subscribe((id) => {
      this.customerService.get(id).forEach(customer => {
        if (!customer){
          this.toastr.warning('Maybe, it\'s deleted','Can\'t find such customer',{ positionClass: 'toast-bottom-right'})
          this.router.navigate(['customerlist']);
        } else {
          this.customer = customer;
          this.orderService.getOrdersByCustomerId(this.customer.id).forEach(orders => {
            if (!orders) {
              this.allOrders = [];
            } else {
              this.allOrders = orders;
            }
          });
        }
      });
    });
  }

}
