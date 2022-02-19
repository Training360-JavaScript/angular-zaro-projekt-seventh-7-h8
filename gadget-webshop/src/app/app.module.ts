import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';


import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { BaseListComponent } from './common/base-list/base-list.component';
import { EditProductFormComponent } from './common/edit-product-form/edit-product-form.component';
import { ProductSelectorComponent } from './common/order/product-selector/product-selector.component';
import { HomeComponent } from './page/home/home.component';
import { ProductListComponent } from './page/product/product-list/product-list.component';
import { CustomerListComponent } from './page/customer/customer-list/customer-list.component';
import { OrderListComponent } from './page/order/order-list/order-list.component';
import { BillListComponent } from './page/bill/bill-list/bill-list.component';
import { EditBillComponent } from './page/bill/edit-bill/edit-bill.component';
import { EditCustomerComponent } from './page/customer/edit-customer/edit-customer.component';
import { EditOrderComponent } from './page/order/edit-order/edit-order.component';
import { EditProductComponent } from './page/product/edit-product/edit-product.component';
import { ViewOrderComponent } from './page/order/view-order/view-order.component';

import { FilterPipe } from './pipe/filter.pipe';
import { SortPipe } from './pipe/sort.pipe';
import { ActiveFilterPipe } from './pipe/active-filter.pipe';
import { ProductMiniDisplayComponent } from './common/order/product-mini-display/product-mini-display.component';
import { CustomerSelectorComponent } from './common/order/customer-selector/customer-selector.component';
import { CustomerMiniDisplayComponent } from './common/order/customer-mini-display/customer-mini-display.component';
import { EditCustomerFormComponent } from './common/edit-customer-form/edit-customer-form.component';
import { PaginateBaseListPipe } from './pipe/paginate-base-list.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    BaseListComponent,
    ProductListComponent,
    CustomerListComponent,
    OrderListComponent,
    BillListComponent,
    EditBillComponent,
    EditCustomerComponent,
    EditOrderComponent,
    EditProductComponent,
    FilterPipe,
    SortPipe,
    ViewOrderComponent,
    EditProductFormComponent,
    EditCustomerFormComponent,
    ProductSelectorComponent,
    ActiveFilterPipe,
    ProductMiniDisplayComponent,
    CustomerSelectorComponent,
    CustomerMiniDisplayComponent,
    PaginateBaseListPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
