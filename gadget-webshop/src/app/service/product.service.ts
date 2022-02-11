import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../model/category';
import { Product } from '../model/product';
import { BaseNetworkService } from './base-network.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseNetworkService<Product> {

  private categories?: Category[];

  constructor(
    public override http: HttpClient,
    private categoryService: CategoryService
    ) {
    super(http);
    this.endpoint = 'product';

    this.categoryService.getAll().forEach(categories => {
      this.categories = categories;
    });

  }

  assignCategory(product: Product): Product {
    product.category = this.categories?.find(cat => cat.id === product.catID);
    return product;
  }

  override getAll(): Observable<Product[]> {
    return super.getAll().pipe(
      map(productList => {
        return productList.map(product => this.assignCategory(product));
      }),
    );
  }

  override get(id: number): Observable<Product> {
    return super.get(id).pipe(
      map(product => this.assignCategory(product) )
    );
  }

}
