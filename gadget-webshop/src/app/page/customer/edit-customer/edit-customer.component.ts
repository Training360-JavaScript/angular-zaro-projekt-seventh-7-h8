import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    map(params => parseInt(params['id']))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.id.subscribe((id) => {
      if(id === 0){
        this.customer = new Customer();
        this.customer.id = 0;
      } else {
        this.customerService.get(id).subscribe( customer => {
          if(!customer) {
            this.toastr.warning('Maybe, it\'s deleted','Can\'t find such customer',{ positionClass: 'toast-bottom-right'})
            this.router.navigate(['customerlist']);
          }
          this.customer = customer;
        })
      }
    })
  }

  onafterSave(): void {
    this.router.navigate(['/customerlist'])
  }

}
