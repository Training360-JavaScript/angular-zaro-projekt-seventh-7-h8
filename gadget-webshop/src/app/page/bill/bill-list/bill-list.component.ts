import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Alignment } from 'src/app/model/alignment';
import { Bill } from 'src/app/model/bill';
import { ButtonDefinition } from 'src/app/model/button-definition';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';
import { BillService } from 'src/app/service/bill.service';
import { TitleCommunicatiorService } from 'src/app/service/title-communicatior.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss'],
})
export class BillListComponent implements OnInit {

  private routeBase: string = 'bill-list';

  billList$: Observable<Bill[]> = this.billService.getAll();

  public columnDefinition: ColumnDefinition[] = [
    new ColumnDefinition({
      title: 'ID',
      column: 'id',
    }),
    new ColumnDefinition({
      title: 'Order Id',
      column: 'orderID',
      alignment: Alignment.right
    }),
    new ColumnDefinition({
      title: 'Status',
      column: 'status',
    }),
    new ColumnDefinition({
      title: 'FirstName',
      column: 'order.customer.firstName',
    }),
    new ColumnDefinition({
      title: 'LastName',
      column: 'order.customer.lastName',
    }),
    new ColumnDefinition({
      title: 'Product',
      column: 'order.product.name',
      sortable: false
    }),
    new ColumnDefinition({
      title: 'Price',
      column: 'order.product.price',
      alignment: Alignment.right
    }),
    new ColumnDefinition({
      title: 'Amount',
      column: 'amount',
      alignment: Alignment.right
    }),
  ];

  public actionButtons: ButtonDefinition[] = [];

  constructor(
    private billService: BillService,
    private toastr: ToastrService,
    private router: Router,
    private titleCommunicator: TitleCommunicatiorService
  ) {}

  ngOnInit(): void {
    this.titleCommunicator.setTitle('Invoice list');
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
        this.billService.delete(evt.entityID);
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
