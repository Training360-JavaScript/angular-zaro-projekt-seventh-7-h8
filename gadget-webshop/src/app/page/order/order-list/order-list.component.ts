import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Alignment } from 'src/app/model/alignment';
import { ButtonDefinition } from 'src/app/model/button-definition';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {

  private routeBase: string = 'orderlist';

  order$: Observable<Order[]> = this.orderService.getAll();

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
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
        this.orderService.delete(evt.entityID);
        this.toastr.error(`Got event ${evt.eventID} for entity ${evt.entityID}`, 'Here we should delete this record', {
          positionClass: 'toast-bottom-right'
        });
        break;
      default:
        this.toastr.warning(`Got event ${evt.eventID} for entity ${evt.entityID}`, 'Unknown event received', {
          positionClass: 'toast-bottom-right'
        });
    }
  }

}
