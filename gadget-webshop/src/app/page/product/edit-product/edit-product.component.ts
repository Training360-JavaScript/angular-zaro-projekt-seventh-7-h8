import { ProductService } from 'src/app/service/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product!: Product;

  id: Observable<number> = this.activatedRoute.params.pipe(
    map(params => params['id'])
  );

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.id.subscribe((id)=> {
      if (id === 0) {
        this.product = new Product();
        this.product.id = 0;
      } else {
        this.productService.get(id).subscribe((product)=>{
          if (!product) {
            product = new Product();
          }
          this.product = product;
        });
      }
    });
  }
}
