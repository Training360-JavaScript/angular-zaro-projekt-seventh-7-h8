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

  public order!: Order;
  public price: number = 0;
  public canChangeDetails: boolean = true;

  public statusList = Object.entries(Status);
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
      if (!id || id === 0) {
        this.order = new Order();
        this.canChangeDetails = true;
        this.handleInitialValues();
      } else {
        this.orderService.get(id).forEach(orderData => {
          if (orderData.status === Status.shipped) {
            this.toastr.error('Sorry, you can\'t edit shipped order.', 'Error', {
              positionClass: 'toast-bottom-right'
            });
            this.router.navigate([`/orderlist`]);
          } else {
            this.order = this.removeArtificalPartsFromOrder(orderData);
            this.fillProductPart();
            this.fillCustomerPart();
            this.canChangeDetails = this.order.status === Status.new;
          }
        });
      }
    });
  }

  handleInitialValues(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        for (const [key, value] of Object.entries(params)) {
          if (key === 'product') {
            this.loadProductFromQueryString(value);
          }
        }
      }
    );
  }

  loadProductFromQueryString(productID: string): void {
    const nProductId:number = +productID;
    if (isNaN(nProductId)) return;

    this.productService.get(nProductId).forEach(product => {
      if (product) {
        this.order.productID = nProductId;
        this.order.product = product;
      }
    });

  }

  removeArtificalPartsFromOrder(orderData: Order): Order {
    for (const [key, value] of Object.entries(orderData)) {
      if (key.includes('.') || typeof value === 'object') {
        delete orderData[key];
      }
    }
    return orderData;
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
    } else {
      this.onStoreModifiedOrder();
    }
  }

  onStoreNewOrder(): void {
    this.order.status = Status.new; //just to make sure :)
    this.order.customerID = +this.order.customerID;
    this.order.productID = +this.order.productID;
    this.orderService.create(this.order).forEach(newOrder => {
      this.toastr.success(`Order with ID ${newOrder.id} crated.`, 'Success', {
        positionClass: 'toast-bottom-right'
      });

      //create associated bill
      this.bill.status = Status.new;
      this.bill.orderID = newOrder.id;
      this.bill.amount = this.price;
      this.billService.create(this.bill).forEach(newInvoice => {
        this.toastr.success(`Invoice with ID ${newInvoice.id} created.`, 'Success', {
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate([`/orderlist`]);
      });

    });
  }

  onStoreModifiedOrder(): void {
    this.order.customerID = +this.order.customerID;
    this.order.productID = +this.order.productID;
    this.orderService.update(this.order).forEach(updatedEntity => {
      console.log(updatedEntity);
      if (updatedEntity.id) {
        this.toastr.success(`Order with ID ${updatedEntity.id} updated.`, 'Success', {
          positionClass: 'toast-bottom-right'
        });

        //get all bills, that associated with this order. (Hopefully exactly one)
        this.billService.getBillByOrderId(updatedEntity.id).forEach(bills => {
          if (!Array.isArray(bills) || bills.length === 0) {
            this.toastr.warning('Can\'t find associatd invoice. Please check your database structure.', 'Warning', {
              positionClass: 'toast-bottom-right'
            });
            this.router.navigate([`/orderlist`]);
          } else if (bills.length > 1) {
            this.toastr.warning('More than one invocice found, can\'t update invoice. Please check your database structure.', 'Warning', {
              positionClass: 'toast-bottom-right'
            });
            this.router.navigate([`/orderlist`]);
          } else {
            this.handleBillUpdate(bills[0]);
          }
        });
      } else {
        this.toastr.warning(`Something happened while updating product.`, 'Warning', {
          positionClass: 'toast-bottom-right'
        });
      }
    });
  }

  handleBillUpdate(bill: Bill):void {
    bill.status = this.order.status;
    bill.amount = this.price;
    this.billService.update(bill).forEach(newInvoice => {
      this.toastr.success(`Invoice with ID ${newInvoice.id} updated.`, 'Success', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate([`/orderlist`]);
    });
  }

}
