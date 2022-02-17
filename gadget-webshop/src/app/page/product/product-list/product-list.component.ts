
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { Alignment } from 'src/app/model/alignment';
import { ButtonDefinition } from 'src/app/model/button-definition';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  private routeBase: string = 'productlist';

  products$:Observable<Product[]>= this.ProductServiceTest.getAll();


  public columnDefinition: ColumnDefinition[] = [
    new ColumnDefinition({
      title: 'ID',
      column: 'id',
    }),
    new ColumnDefinition({
      title: 'Name',
      column: 'name',
    }),
    new ColumnDefinition({
      title: 'Category',
      column: 'category.name',
      alignment: Alignment.center,
      sortable: false
    }),
    new ColumnDefinition({
      title: 'Price',
      column: 'price',
      alignment: Alignment.right
    }),
    new ColumnDefinition({
      title: 'Active',
      column: 'active',
      alignment: Alignment.center
    }),
    new ColumnDefinition({
      title: 'Featured',
      column: 'featured',
      alignment: Alignment.center
    }),
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
    private ProductServiceTest: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onCustomButtonClicked(evt: CustomButtonEvent):void {
    switch(evt.eventID) {
      case 'DETAILS':
        this.toastr.success(`Got event ${evt.eventID} for product ${evt.eventID}`, 'This is a message', {
          positionClass: 'toast-bottom-right'
        });
        break;
      case 'EDIT':
      case 'CREATE':
        this.router.navigate([`/${this.routeBase}/edit`, evt.entityID]);
        break;
      case 'DELETE':
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
