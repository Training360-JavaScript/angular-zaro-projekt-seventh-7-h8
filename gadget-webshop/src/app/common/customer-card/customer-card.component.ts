import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent implements OnInit {

  testOutput: any = 'szöveg tesztelni'
  constructor(
    private CustomerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.CustomerService.getAll().forEach(response => {
      this.testOutput = JSON.stringify(response, null, '\t')
    });

  }

}
