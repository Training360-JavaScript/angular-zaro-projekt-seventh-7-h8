import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.scss']
})
export class ProductSelectorComponent implements OnInit {

  @Output() productSelected: EventEmitter<number> =  new EventEmitter();

  public selectedProduct?: number;
  public productList: Observable<Product[]> = this.productService.getAll();

  constructor(
    private productService: ProductService
  ) { }


  ngOnInit(): void {
  }

  onReturnSelectedProduct():void {
    this.productSelected.emit(this.selectedProduct || 0);
  }

}
