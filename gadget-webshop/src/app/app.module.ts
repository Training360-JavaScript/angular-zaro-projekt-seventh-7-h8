import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { BaseListComponent } from './common/base-list/base-list.component';
import { KeysPipe } from './pipe/keys.pipe';
import { ProductsComponent } from './page/products/products.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  /*
  {
    path: 'product',
    component: ProductsComponent
  },
  */
  {
    path: '**',
    component: HomeComponent
  },
]
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    BaseListComponent,
    KeysPipe,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
