import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Category } from '../model/category';
import { Product } from '../model/product';
import { BaseNetworkService } from './base-network.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseNetworkService<Product> {

  constructor(
    public override http: HttpClient,
    private categoryService: CategoryService
    ) {
    super(http);
    this.endpoint = 'product';
  }

  private getCategoryByProduct(productId: number) {
    return this.categoryService.get(productId);
  }

  override getAll(): Observable<Product[]> {
    const allProduct$ = super.getAll();
    const allCategories$ = this.categoryService.getAll();

    return forkJoin([allProduct$, allCategories$]).pipe(
      map(responses => {
        responses[0].forEach((product, id) => {
          const category = responses[1].find(cat => cat.id === product.catID) || new Category();
          product.category = category;
          responses[0][id] = this.flattenResponse(product);
        })
        return responses[0];
      })
    )
  }

  override get(id: number): Observable<Product> {
    return super.get(id).pipe(
      switchMap(productData => {
        return this.getCategoryByProduct(productData?.id).pipe(
          map(category => {
            if (category) productData.category = category;
            return this.flattenResponse(productData);
          })
        )
      })
    );
  }

}
