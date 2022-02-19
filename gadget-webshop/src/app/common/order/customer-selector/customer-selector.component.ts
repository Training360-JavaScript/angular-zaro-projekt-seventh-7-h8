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
  public customerList: Observable<Customer[]> = this.customerService.getAll();

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
  }

  onReturnSelectedCustomer():void {
    this.customerSelected.emit(this.selectedCustomer || 0);
  }

}
