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
  @Output() saveNewCustomer: EventEmitter<Customer> = new EventEmitter();

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

  }


  onCloseWithoutSaving(): void {
    this.closeWithoutSaving.emit();
    this.router.navigate([`/customerlist`]);
  }

  onSaveNewCustomer(customer: Customer): void {
    customer.address = `${customer['address.zip']} ${customer['address.street']}`;
    if (customer.id === 0) {
      this.customerService.create(customer).forEach(response => {
        this.onSuccess('created', response);
       });
    } else {
      this.customerService.update(customer).forEach(response => {
        this.onSuccess('updated', response);
       });
    }
  }

  onSuccess(actionTemp: string, customer: Customer): void {
    this.toastr.success(`customer ${actionTemp}`,
      'this is a message',
      { positionClass: 'toast-bottom-right' }
    );
    this.saveNewCustomer.emit(customer);
  }
}
