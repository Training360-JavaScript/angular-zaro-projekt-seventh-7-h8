import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { ToastrService } from 'ngx-toastr';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss']
})
export class EditProductFormComponent implements OnInit {

  @Input() product!: Product;
  @Input() categories: Category[] | undefined;

  @Output() closeWithoutSaving: EventEmitter<void> = new EventEmitter();
  @Output() saveNewProduct: EventEmitter<CustomButtonEvent> = new EventEmitter();

  constructor(private productService: ProductService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {}

  onCloseWithOutSaving(): void {
    this.closeWithoutSaving.emit();
    this.router.navigate([`/productlist`]);
  }

  onSaveNewProduct(product: Product): void {
    let eventData: CustomButtonEvent;
    if (product.id === 0) {
      this.productService.create(product).subscribe(()=>{
        eventData = {
          eventID: 'created',
          entityID: 0
        };
        this.saveNewProduct.emit(eventData);
      });
    } else {
      this.productService.update(product).subscribe(()=>{
        eventData = {
          eventID: 'updated',
          entityID: product.id
        };
        this.saveNewProduct.emit(eventData);
      });
    }
  }
}
