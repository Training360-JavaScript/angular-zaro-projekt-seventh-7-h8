import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Alignment } from 'src/app/model/alignment';
import { ButtonDefinition } from 'src/app/model/button-definition';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { TitleCommunicatiorService } from 'src/app/service/title-communicatior.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {

  private routeBase: string = 'customerlist';

  customers$?: Observable<Customer[]>;
  refreshCustomer$ = new BehaviorSubject<boolean>(true);

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
      column: 'address.zip',
      sortable: false
    }),
    new ColumnDefinition({
      title: 'Street',
      column: 'address.street',
      sortable: false
    }),

    new ColumnDefinition({
      title: 'Active',
      column: 'active',
      alignment: Alignment.center
    })
  ];

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
    },
    {
      title: 'Place order',
      icon: 'fa-cart-plus',
      eventId: 'NEWORDER',
    }
  ];

  constructor(
    private customerService: CustomerService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router,
    private titleCommunicator: TitleCommunicatiorService
  ) {}

  ngOnInit(): void {
    this.customers$ = this.refreshCustomer$.pipe(switchMap(_ => this.customerService.getAll()));
    this.titleCommunicator.setTitle('Customer list');
  }


  onCustomButtonClicked(evt: CustomButtonEvent):void {
    switch(evt.eventID) {
      case 'DETAILS':
        this.router.navigate([`/${this.routeBase}/details`, evt.entityID]);
        break;
      case 'EDIT':
      case 'CREATE':
        this.router.navigate([`/${this.routeBase}/edit`, evt.entityID]);
        break;
      case 'DELETE':
        this.onDeleteCustomer(evt);
        break;
      case 'NEWORDER':
          this.onCreateOrderForCustomer(evt.entityID);
          break;
      default:
        this.toastr.warning(`Got event ${evt.eventID} for entity ${evt.entityID}`, 'Unknown event received', {
          positionClass: 'toast-bottom-right'
        });
    }
  }

  onCreateOrderForCustomer(customerId: number): void {
    this.router.navigate(['/orderlist/edit', 0], { queryParams: { customer: customerId } });
  }

  onDeleteCustomer(evt: CustomButtonEvent):void {
    //Warning: first we shold check if there is any Order with this product...
    this.orderService.getOrdersByCustomerId(evt.entityID).forEach(orders => {
      if (Array.isArray(orders) && orders.length > 0) {
        console.log(orders);
        this.toastr.warning('You cannot delete this customer because he / she is part of one or more order. Please delete them first.', 'Can\'t delete customer.', {
          positionClass: 'toast-bottom-right'
        });
      } else {
        this.doDeleteCustomer(evt.entityID);
      }
    });
  }
  doDeleteCustomer(productID: number):void {
    this.customerService.delete(productID).forEach(_ => {
      //The response looks like this: {success: true, removed: '232'}
      //TODO: Create a message model, assign it to delete method return type, check and handle success message here.
      this.toastr.success('Customer successfully deleted.', 'Done', {
        positionClass: 'toast-bottom-right'
      });
      this.refreshCustomer$.next(true);
    })
  }

}
