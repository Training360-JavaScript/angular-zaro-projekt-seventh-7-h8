import { Component, Input, OnInit } from '@angular/core';
import { Bill } from 'src/app/model/bill';
import { Status } from 'src/app/model/status';

@Component({
  selector: 'app-bill-stats',
  templateUrl: './bill-stats.component.html',
  styleUrls: ['./bill-stats.component.scss']
})
export class BillStatsComponent implements OnInit {

  @Input() bills: Bill[] = [];

  public allBills: number = 0;
  public newBills: number = 0;
  public displayBills: Bill[] = [];

  constructor() { }

  ngOnInit(): void {
    const unpaidBills: Bill[] = this.bills.filter(bill => bill.status === Status.new);
    this.allBills = this.bills.length;
    this.newBills = unpaidBills.length;
    this.displayBills = unpaidBills.sort(({id: a}, {id: b}) => b-a).slice(0, 5);
  }
}
