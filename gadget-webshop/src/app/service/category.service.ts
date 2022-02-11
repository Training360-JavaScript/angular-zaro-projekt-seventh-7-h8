import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category';
import { BaseNetworkService } from './base-network.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseNetworkService<Category> {

  constructor(public override http: HttpClient,) {
    super(http);
    this.endpoint = 'category';
  }
}
