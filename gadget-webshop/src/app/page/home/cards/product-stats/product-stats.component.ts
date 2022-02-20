import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-stats',
  templateUrl: './product-stats.component.html',
  styleUrls: ['./product-stats.component.scss']
})
export class ProductStatsComponent implements OnInit {

  @Input() products: Product[] = [];

  public allProducts: number = 0;
  public activeProducts: number = 0;
  public displayProducts: Product[] = [];

  constructor() { }

  ngOnInit(): void {
    this.allProducts = this.products.length;
    this.activeProducts = this.products.filter(product => product.active).length;
    this.displayProducts = this.products.sort(({id: a}, {id: b}) => b-a).slice(0, 5);
  }

}
