import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Status } from 'src/app/model/status';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss'],
})
export class BillListComponent implements OnInit {
  bills: Bill[] = [
    { id: 1, orderID: 598, amount: 904, status: Status.new },
    { id: 2, orderID: 485, amount: 256, status: Status.new },
  ];

  billList?: Observable<Bill>;

  constructor(
    private billService: BillService
  ) {}

  ngOnInit(): void {}
}
