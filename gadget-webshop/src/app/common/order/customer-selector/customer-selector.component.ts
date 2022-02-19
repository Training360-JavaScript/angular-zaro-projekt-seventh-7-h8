import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.scss']
})
export class CustomerSelectorComponent implements OnInit {

  @Output() customerSelected: EventEmitter<number> =  new EventEmitter();

  public selectedCustomer?: number;
  public isCreateMode: boolean = false;
  public customerList: Observable<Customer[]> = this.customerService.getAll();
  public newCustomer: Customer = new Customer();

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
  }

  onReturnSelectedCustomer():void {
    this.customerSelected.emit(this.selectedCustomer || 0);
  }

  onInitAddCustomer(): void {
    this.isCreateMode = true;
  }

  onCloseNewDialogWithoutSaving(): void {
    this.isCreateMode = false;
    this.newCustomer = new Customer();
  }

  onNewCustomerCreated(customer: Customer): void {
    this.isCreateMode = false;
    this.customerSelected.emit(customer.id);
  }

}
