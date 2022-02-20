import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Product } from 'src/app/model/product';

import * as Chartist from 'chartist';

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: ['./chart-display.component.scss']
})
export class ChartDisplayComponent implements OnInit {
  /*
  config: any = {
    type: 'line',
    data: {},
    options: {},
    plugins: []
  }
  chartistData: string = "chartist.barData";
  chartistChartType: string = "Bar";
  */

  public allClients!: Customer[];
  public allProducts!: Product[];
  public allBills!: Bill[];

  public testOutput: string = '';


  constructor() { }

  ngOnInit(): void {
    this.initFirstChart();
  }

  startAnimationForBarChart(chart: any){
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data: any) {
      if(data.type === 'bar'){
          seq2++;
          data.element.animate({
            opacity: {
              begin: seq2 * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
      }
    });

    seq2 = 0;
};

datawebsiteViewsChart: any = {
  labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  series: [
    [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

  ]
};

  initFirstChart(): void {
    const datawebsiteViewsChart = this.datawebsiteViewsChart;
    const optionswebsiteViewsChart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
    const responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value: any) {
            return value[0];
          }
        }
      }]
    ];
    const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

}
