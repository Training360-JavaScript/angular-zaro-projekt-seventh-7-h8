import { ProductFilterPipe } from './pipe/productFilter.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { BaseListComponent } from './common/base-list/base-list.component';
import { KeysPipe } from './pipe/keys.pipe';
import { ProductListComponent } from './page/product/product-list/product-list.component';
import { CustomerListComponent } from './page/customer/customer-list/customer-list.component';
import { OrderListComponent } from './page/order/order-list/order-list.component';
import { BillListComponent } from './page/bill/bill-list/bill-list.component';
import { EditBillComponent } from './page/bill/edit-bill/edit-bill.component';
import { EditCustomerComponent } from './page/customer/edit-customer/edit-customer.component';
import { EditOrderComponent } from './page/order/edit-order/edit-order.component';
import { EditProductComponent } from './page/product/edit-product/edit-product.component';
import { FormsModule } from '@angular/forms';
import { SortPipe } from './pipe/sort.pipe';
import { ViewOrderComponent } from './page/order/view-order/view-order.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    BaseListComponent,
    KeysPipe,
    ProductListComponent,
    CustomerListComponent,
    OrderListComponent,
    BillListComponent,
    EditBillComponent,
    EditCustomerComponent,
    EditOrderComponent,
    EditProductComponent,
    ProductFilterPipe,
    SortPipe,
    ViewOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
