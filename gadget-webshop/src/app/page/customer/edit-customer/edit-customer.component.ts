import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customer!: Customer;
  id: Observable<number> = this.activatedRoute.params.pipe(
    map(params => params['id'])
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.id.subscribe((id) => {
      if(id === 0){
        this.customer = new Customer();
        this.customer.id = 0;
      } else {
        this.customerService.get(id).subscribe( customer => {
          if(!customer) {
            customer = new Customer();
          }
          this.customer = customer;
        })
      }
    })
  }

}
