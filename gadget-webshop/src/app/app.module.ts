import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { BaseListComponent } from './common/base-list/base-list.component';
import { KeysPipe } from './pipe/keys.pipe';
import { ProductListComponent } from './page/product-list/product-list.component';
import { CustomerListComponent } from './page/customer-list/customer-list.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { BillListComponent } from './page/bill-list/bill-list.component';
import { EditBillComponent } from './page/edit-bill/edit-bill.component';
import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';
import { EditOrderComponent } from './page/edit-order/edit-order.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';

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
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
