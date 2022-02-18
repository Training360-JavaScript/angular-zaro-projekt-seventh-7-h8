import { ProductService } from './../../../service/product.service';
import { BaseNetworkService } from './../../../service/base-network.service';

import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { Alignment } from 'src/app/model/alignment';
import { ButtonDefinition } from 'src/app/model/button-definition';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  private routeBase: string = 'productlist';

  products$?: Observable<Product[]>;
  refreshProduct$ = new BehaviorSubject<boolean>(true);


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
    private productService: ProductService,
    private orderService: OrderService, //we need orderservice tho check weather if a product is a part of an order or not
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products$ = this.refreshProduct$.pipe(switchMap(_ => this.productService.getAll()));
  }

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
       this.onDeleteProduct(evt);
        break;
      default:
        this.toastr.warning(`Got event ${evt.eventID} for entity ${evt.entityID}`, 'Unknown event received', {
          positionClass: 'toast-bottom-right'
        });
    }
  }

  onDeleteProduct(evt: CustomButtonEvent):void {
    //Warning: first we shold check if there is any Order with this product...
    this.orderService.getOrdersByProductId(evt.entityID).forEach(orders => {
      if (Array.isArray(orders) && orders.length > 0) {
        console.log(orders);
        this.toastr.warning('You cannot delete this product because this is part of one or more order. Please delete them first.', 'Can\'t delete product.', {
          positionClass: 'toast-bottom-right'
        });
      } else {
        this.doDeleteProduct(evt.entityID);
      }
    });
  }
  doDeleteProduct(productID: number):void {
    this.productService.delete(productID).forEach(_ => {
      console.log(_);
      //The response looks like this: {success: true, removed: '232'}
      //TODO: Create a message model, assign it to delete method return type, check and handle success message here.
      this.toastr.success('Product successfully deleted.', 'Done', {
        positionClass: 'toast-bottom-right'
      });
      this.refreshProduct$.next(true);
    })
  }

}
