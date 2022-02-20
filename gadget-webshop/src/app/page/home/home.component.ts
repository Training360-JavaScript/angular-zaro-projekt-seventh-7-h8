import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/service/bill.service';
import { CategoryService } from 'src/app/service/category.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

import { Customer } from 'src/app/model/customer';
import { Product } from 'src/app/model/product';
import { Bill } from 'src/app/model/bill';
import { TitleCommunicatiorService } from 'src/app/service/title-communicatior.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public allClients!: Customer[];
  public allProducts!: Product[];
  public allBills!: Bill[];

  public testOutput: string = '';



  constructor(
    private CategoryServiceTest: CategoryService,
    private ProductServiceTest: ProductService,
    private CustomerServiceTest: CustomerService,
    private OrderServiceTest: OrderService,
    private BillServiceTest: BillService,
    private titleCommunicator: TitleCommunicatiorService
  ) { }



  ngOnInit(): void {
    //get all data for cards at once...
    this.CustomerServiceTest.getAll().forEach(customers => this.allClients = customers);
    this.ProductServiceTest.getAll().forEach(products => this.allProducts = products);
    this.BillServiceTest.getAll().forEach(bills => this.allBills = bills);
    this.titleCommunicator.setTitle('Home');
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
      this.CustomerServiceTest.get(2).forEach(response => {this.testOutput = JSON.stringify(response, null, '\t')});
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

    //For historical purposes: Used to generate fake data (but real) to address fields.
    /* getAddr() {
      this.CustomerServiceTest.getAddr().forEach(addr => {
        this.CustomerServiceTest.getAll().forEach(cust => {
          cust.forEach(aktCustomer => {
            const newAddr = new Address();
            const address:any = addr.addresses[Math.floor(Math.random()*addr.addresses.length)];
            newAddr.zip = +address.postalCode;
            newAddr.city = address.city;
            newAddr.country = address.state;
            newAddr.street = address.address1;
            aktCustomer.address = JSON.stringify(newAddr);
            for (const [key, value] of Object.entries(aktCustomer)) {
              if (key.includes('.')) {
                delete aktCustomer[key];
              }
            }
            console.log(aktCustomer);
            this.CustomerServiceTest.update(aktCustomer).forEach(r => console.log(r));
          });
        });
      });
    } */


}
