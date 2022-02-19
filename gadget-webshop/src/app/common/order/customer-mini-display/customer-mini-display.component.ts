import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-customer-mini-display',
  templateUrl: './customer-mini-display.component.html',
  styleUrls: ['./customer-mini-display.component.scss']
})
export class CustomerMiniDisplayComponent implements OnInit {

  @Input() customer!: Customer;
  @Output() resetCustomer: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onResetCustomer() {
    this.resetCustomer.emit(true);
  }
}
