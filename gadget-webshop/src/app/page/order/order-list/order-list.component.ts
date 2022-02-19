import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Alignment } from 'src/app/model/alignment';
import { ButtonDefinition } from 'src/app/model/button-definition';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';
import { Order } from 'src/app/model/order';
import { Status } from 'src/app/model/status';
import { BillService } from 'src/app/service/bill.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {

  private routeBase: string = 'orderlist';

  order$?: Observable<Order[]>;
  refreshProduct$ = new BehaviorSubject<boolean>(true);


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
  //TODO:: Shold define calculated columns, like amount * price = sumprice

  public actionButtons: ButtonDefinition[] = [
    {
      title: 'Details',
      icon: 'fa-info-circle text-info',
      eventId: 'DETAILS',
    },
    {
      title: 'Edit',
      icon: 'fa-pencil text-primary',
      eventId: 'EDIT',
    },
    {
      title: 'Remove',
      icon: ' fa-trash text-danger',
      eventId: 'DELETE',
    }
  ];

  constructor(
    private orderService: OrderService,
    private billService: BillService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.order$ = this.refreshProduct$.pipe(switchMap(_ => this.orderService.getAll()));
  }

  onCustomButtonClicked(evt: CustomButtonEvent):void {
    switch(evt.eventID) {
      case 'DETAILS':
        this.toastr.success(`Got event ${evt.eventID} for entity ${evt.eventID}`, 'This is a message', {
          positionClass: 'toast-bottom-right'
        });
        break;
      case 'EDIT':
      case 'CREATE':
        this.router.navigate([`/${this.routeBase}/edit`, evt.entityID]);
        break;
      case 'DELETE':
        this.onDeleteOrder(evt.entityID);
        break;
      default:
        this.toastr.warning(`Got event ${evt.eventID} for entity ${evt.entityID}`, 'Unknown event received', {
          positionClass: 'toast-bottom-right'
        });
    }
  }

  onDeleteOrder(id: number): void {
    this.orderService.get(id).forEach(item => {
      if (item.status === Status.shipped || item.status === Status.paid) {
        this.toastr.error('Sorry, you can\'t delete a shipped or paid order. Please change status first.', 'Error', {
          positionClass: 'toast-bottom-right'
        });
      } else {
        this.deleteOrderAndAssociatedInvoices(item);
      }
    })
  }

  deleteOrderAndAssociatedInvoices(order: Order): void {
    this.billService.getBillByOrderId(order.id).forEach(bill => {
      if (!Array.isArray(bill) || bill.length === 0) {
        this.toastr.warning(`No associated invoices found.`, 'Warning', {
          positionClass: 'toast-bottom-right'
        });
      } else {
        bill.forEach(billData => {
          this.billService.delete(billData.id).forEach(_ => {
            this.toastr.success(`Invoice with ID ${billData.id} successfully deleted.`, 'Done', {
              positionClass: 'toast-bottom-right'
            });
          });
        });
      }
    });
    this.orderService.delete(order.id).forEach(_ => {
      this.toastr.success(`Order with ID ${order.id} successfully deleted.`, 'Done', {
        positionClass: 'toast-bottom-right'
      });
      this.refreshProduct$.next(true);
    });
  }

}
