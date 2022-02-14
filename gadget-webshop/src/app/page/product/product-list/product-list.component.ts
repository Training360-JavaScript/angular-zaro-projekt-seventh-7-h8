import { ProductFilterPipe } from './../../../pipe/productFilter.pipe';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/service/bill.service';
import { CategoryService } from 'src/app/service/category.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
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

  public testOutput: string = '';

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
      column: 'category',
      subcolumn: 'name',
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
    private CategoryServiceTest: CategoryService,
    private ProductServiceTest: ProductService,
    private CustomerServiceTest: CustomerService,
    private OrderServiceTest: OrderService,
    private BillServiceTest: BillService,
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

  //Ezek tesztek, törölhetőek majd a megfelelő importokkal együtt.
  getAllCategoryTest(): void {
    this.CategoryServiceTest.getAll().forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
  }
  getOneCategoryTest(): void {
    this.CategoryServiceTest.get(1).forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
  }
  getOneProductTest(): void {
    this.ProductServiceTest.get(1).forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
  }
  getAllProductTest(): void {
    this.ProductServiceTest.getAll().forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
  }
  getOneCustomerTest(): void {
    this.CustomerServiceTest.get(1).forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
  }
  getAllCustomerTest(): void {
    this.CustomerServiceTest.getAll().forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
  }
  getOneOrderTest(): void {
    this.OrderServiceTest.get(1).forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
  }
  getAllOrderTest(): void {
    this.OrderServiceTest.getAll().forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
  }
  getOneBillTest(): void {
    this.BillServiceTest.get(1).forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
  }
  getAllBillTest(): void {
    this.BillServiceTest.getAll().forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
  }

}
