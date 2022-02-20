import { HomeComponent } from './page/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillListComponent } from './page/bill/bill-list/bill-list.component';
import { EditBillComponent } from './page/bill/edit-bill/edit-bill.component';
import { CustomerListComponent } from './page/customer/customer-list/customer-list.component';
import { EditCustomerComponent } from './page/customer/edit-customer/edit-customer.component';
import { OrderListComponent } from './page/order/order-list/order-list.component';
import { EditOrderComponent } from './page/order/edit-order/edit-order.component';
import { ProductListComponent } from './page/product/product-list/product-list.component';
import { EditProductComponent } from './page/product/edit-product/edit-product.component';
import { ViewOrderComponent } from './page/order/view-order/view-order.component';
import { EditCategoryComponent } from './page/category/edit-category/edit-category.component';
import { CategoryListComponent } from './page/category/category-list/category-list.component';

const routes: Routes = [

  {
    path:'',
    component:HomeComponent,
  },
  {
    path: 'bill-list',
    component: BillListComponent
  },
  {
    path: 'bill-list/edit/:id',
    component: EditBillComponent
  },
  {
    path: 'customerlist',
    component: CustomerListComponent
  },
  {
    path: 'customerlist/edit/:id',
    component: EditCustomerComponent
  },
  {
    path: 'orderlist',
    component: OrderListComponent
  },
  {
    path: 'orderlist/edit/:id',
    component: EditOrderComponent
  },
  {
    path: 'orderlist/:id',
    component: ViewOrderComponent
  },
  {
    path: 'productlist',
    component: ProductListComponent
  },
  {
    path: 'productlist/edit/:id',
    component: EditProductComponent
  },
  {
    path: 'categorylist',
    component: CategoryListComponent
  },
  {
    path: 'categorylist/edit/:id',
    component: EditCategoryComponent
  },
  {
    path: '**',
    component: HomeComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
