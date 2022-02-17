import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/service/bill.service';
import { CategoryService } from 'src/app/service/category.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public testOutput: string = '';

  constructor(
    private CategoryServiceTest: CategoryService,
    private ProductServiceTest: ProductService,
    private CustomerServiceTest: CustomerService,
    private OrderServiceTest: OrderService,
    private BillServiceTest: BillService,
  ) { }

  ngOnInit(): void {
  }


    //Ezek tesztek, törölhetőek majd a megfelelő importokkal együtt.
    getAllCategoryTest(): void {
      this.CategoryServiceTest.getAll().forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
    }
    getOneCategoryTest(): void {
      this.CategoryServiceTest.get(1).forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
    }
    getOneProductTest(): void {
      this.ProductServiceTest.get(1).forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
    }
    getAllProductTest(): void {
      this.ProductServiceTest.getAll().forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
    }
    getOneCustomerTest(): void {
      this.CustomerServiceTest.get(1).forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
    }
    getAllCustomerTest(): void {
      this.CustomerServiceTest.getAll().forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
    }
    getOneOrderTest(): void {
      this.OrderServiceTest.get(1).forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
    }
    getAllOrderTest(): void {
      this.OrderServiceTest.getAll().forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
    }
    getOneBillTest(): void {
      this.BillServiceTest.get(1).forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
    }
    getAllBillTest(): void {
      this.BillServiceTest.getAll().forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
    }


}
