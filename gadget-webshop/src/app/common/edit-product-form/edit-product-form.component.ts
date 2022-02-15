import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss']
})
export class EditProductFormComponent implements OnInit {

  @Input() product!: Product;
  @Input() categories: Category[] | undefined;

  @Output() closeWithoutSaving: EventEmitter<void> = new EventEmitter();
  @Output() saveNewProduct: EventEmitter<Product> = new EventEmitter();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {}

  onCloseWithOutSaving(): void {
    this.closeWithoutSaving.emit();
  }

  onSaveNewProduct(product: Product): void {
    if (product.id === 0) {
      this.productService.create(product);
    } else {
      this.productService.update(product);
    }
    // todo pop up toaster
    this.saveNewProduct.emit(product);
  }
}
