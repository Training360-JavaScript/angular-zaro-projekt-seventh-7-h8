import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.scss']
})
export class ProductSelectorComponent implements OnInit {

  @Output() productSelected: EventEmitter<number> =  new EventEmitter();

  public selectedProduct?: number;
  public isCreateMode: boolean = false;
  public productList: Observable<Product[]> = this.productService.getAll();
  public newProduct: Product = new Product();
  public categoryList$ = this.categoryService.getAll();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }


  ngOnInit(): void {
  }

  onReturnSelectedProduct():void {
    this.productSelected.emit(this.selectedProduct || 0);
  }

  onInitAddProduct(): void {
    this.isCreateMode = true;
  }

  onCloseNewDialogWithoutSaving(): void {
    this.isCreateMode = false;
    this.newProduct = new Product();
  }

  onNewProductCreated(eventData: CustomButtonEvent): void {
    this.isCreateMode = false;
    this.productSelected.emit(eventData.entityID);
  }


}
