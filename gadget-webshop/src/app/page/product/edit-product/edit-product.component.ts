import { CustomButtonEvent } from 'src/app/model/custom-button-event';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product!: Product;
  category!:Category[];

  id: Observable<number> = this.activatedRoute.params.pipe(
    map(params => parseInt(params['id']))
  );

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private router:Router,
    private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.id.subscribe((id)=> {
      if (id === 0) {
        this.product = new Product();
        this.product.id = 0;
      } else {
        this.productService.get(id).subscribe((product)=>{
          if (!product) {
            this.toastr.warning('Maybe, it\'s deleted','Can\'t find such product',{ positionClass: 'toast-bottom-right'})
            this.router.navigate(['productlist']);
          }
          this.product = product;
        });
      }
    });
    this.categoryService.getAll().subscribe((categories)=>{
      this.category=categories;
    })
  }

  onSaveButtonClicked(evt: CustomButtonEvent) {
    this.toastr.success(`Product ${evt.eventID} with id: ${evt.entityID}`, 'Success', {
      positionClass: 'toast-bottom-right'
    });

    this.router.navigate([`/productlist`]);
  }
}
