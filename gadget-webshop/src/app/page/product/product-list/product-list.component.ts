
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { Alignment } from 'src/app/model/alignment';
import { ButtonDefinition } from 'src/app/model/button-definition';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

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

  public extraButtons: ButtonDefinition[] = [
    {
      title: 'Place order',
      icon: 'fa-cart-plus',
      eventId: 'NEWORDER',
    }
  ];

  constructor(
    private ProductServiceTest: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onCustomButtonClicked(evt: CustomButtonEvent) {
    console.log(evt);
    this.ProductServiceTest.get(evt.entityID).forEach(product => {
      this.toastr.success(`Got event ${evt.eventID} for product ${product.name}`, 'This is a message', {
        positionClass: 'toast-bottom-right'
      });
    })
  }

}
