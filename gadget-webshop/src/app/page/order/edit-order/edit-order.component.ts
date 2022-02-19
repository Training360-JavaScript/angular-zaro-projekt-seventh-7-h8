import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  private id: Observable<number> = this.activatedRoute.params.pipe(
    map(params => parseInt(params['id']))
  );

  public order: Order = new Order();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.id.subscribe((id)=> {
      console.log(id);
      console.log(this.order);
    });
  }

  onProductSelected(productId: number): void {
    this.order.productID = productId;
    this.fillProductPart();
  }

  fillProductPart():void {
    if(this.order.productID === 0) {
      this.order.product = new Product();
    } else {
      this.productService.get(this.order.productID).forEach(product => {
        this.order.product = product;
      })
    }
  }

  onResetProduct() {
    this.order.productID = 0;
    this.order.product = new Product();
  }

}
