import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent implements OnInit {
  bill: any;
  constructor(
    private ar: ActivatedRoute,
    private hservice: BillService
  ) {
    this.ar.params.subscribe( params => {
      this.hservice.getOrderByBillId( params['id']).forEach(bill => {
        this.bill = bill
      })
    })
   }

  ngOnInit(): void {
  }

}
