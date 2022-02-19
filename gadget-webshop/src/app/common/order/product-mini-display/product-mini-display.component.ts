import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-mini-display',
  templateUrl: './product-mini-display.component.html',
  styleUrls: ['./product-mini-display.component.scss']
})
export class ProductMiniDisplayComponent implements OnInit {

  @Input() product!: Product;
  @Output() resetProduct: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onResetProduct() {
    this.resetProduct.emit(true);
  }

}
