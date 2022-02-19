import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/model/address';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-edit-customer-form',
  templateUrl: './edit-customer-form.component.html',
  styleUrls: ['./edit-customer-form.component.scss']
})
export class EditCustomerFormComponent implements OnInit {

  @Input() customer!: Customer;
  @Input() address!: Address;

  @Output() closeWithoutSaving: EventEmitter<void> = new EventEmitter();
  @Output() saveNewCostumer: EventEmitter<Customer> = new EventEmitter();

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

  }


  onCloseWithOutSeving(): void {
    this.closeWithoutSaving.emit();
    this.router.navigate([`/customerlist`]);
  }

  onSaveNewCustomer(customer: Customer):void {
    let actionTemp;
    if(customer.id === 0) {
      this.customerService.create(customer);
      actionTemp= 'create'
    } else {
      this.customerService.update(customer);
      actionTemp = 'update'
    }
    this.toastr.success(`customer ${actionTemp}`,
      `this is a message`,
      {positionClass: `toast-buttom-right`}
      );
      this.saveNewCostumer.emit(customer);
      this.router.navigate(['/customerlist']);
      console.log(customer)
  }

}
