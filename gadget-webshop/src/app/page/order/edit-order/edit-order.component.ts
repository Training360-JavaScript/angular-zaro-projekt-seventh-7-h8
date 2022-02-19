import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { Status } from 'src/app/model/status';
import { BillService } from 'src/app/service/bill.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
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
  public price: number = 0;

  private bill: Bill = new Bill();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private billService: BillService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id.subscribe((id) => {
      console.log(id);
      console.log(this.order);
    });
  }

  onProductSelected(productId: number): void {
    this.order.productID = productId;
    this.fillProductPart();
  }

  fillProductPart(): void {
    if (this.order.productID === 0) {
      this.order.product = new Product();
    } else {
      this.productService.get(this.order.productID).forEach(product => {
        this.order.product = product;
        this.onChangeAmount(); //To recalculate price
      })
    }
  }

  onResetProduct() {
    this.order.productID = 0;
    this.order.product = new Product();
  }

  onCustomerSelected(customerId: number): void {
    this.order.customerID = customerId;
    this.fillCustomerPart();
  }

  fillCustomerPart(): void {
    if (this.order.customerID === 0) {
      this.order.customer = new Customer();
    } else {
      this.customerService.get(this.order.customerID).forEach(customer => {
        this.order.customer = customer;
      })
    }
  }

  onResetCustomer(): void {
    this.order.customerID = 0;
    this.order.customer = new Customer();
  }

  onChangeAmount(): void {
    this.price = this.order.amount * this.order.product.price;
  }

  onSave(): void {
    if (this.order.id === 0) {
      this.onStoreNewOrder();
    }
  }

  onStoreNewOrder(): void {
    this.order.status = Status.new;
    this.orderService.create(this.order).forEach(newOrder => {
      console.log(newOrder);
      this.toastr.success(`Order with ID ${newOrder.id} crated.`, 'Success', {
        positionClass: 'toast-bottom-right'
      });

      //create associated bill
      this.bill.status = Status.new;
      this.bill.orderID = newOrder.id;
      this.bill.amount = this.price;
      this.billService.create(this.bill).forEach(newInvoice => {
        this.toastr.success(`Invoice with ID ${newInvoice.id} crated.`, 'Success', {
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate([`/orderList`]);
      });

    });
  }

}
