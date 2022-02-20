import { Component, OnInit } from '@angular/core';
// import { angularChartist } from 'angular-chartist.js';

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: ['./chart-display.component.scss']
})
export class ChartDisplayComponent implements OnInit {
config: any = {
    type: 'line',
    data: {},
    options: {},
    plugins: []
  }


  constructor() { }

  ngOnInit(): void {
  }

}
