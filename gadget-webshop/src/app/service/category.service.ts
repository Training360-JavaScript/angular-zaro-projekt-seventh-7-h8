import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category';
import { BaseNetworkService } from './base-network.service';
import { distinct, map, mergeAll, Observable, switchMap, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseNetworkService<Category> {

  constructor(public override http: HttpClient,) {
    super(http);
    this.endpoint = 'category';
  }
  // override getAll(): Observable<Category[]> {
  //     return super.getAll().pipe(map(cat => cat.id)
  //     .distinct()
  //     .toArray());
  // }
}
