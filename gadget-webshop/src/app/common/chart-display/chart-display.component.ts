import { Component, Input, OnInit } from '@angular/core';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Product } from 'src/app/model/product';

import * as Chartist from 'chartist';
import { SortPipe } from 'src/app/pipe/sort.pipe';

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


  @Input() allClients: Customer[] = [];
  @Input() allProducts: Product[] = [];
  @Input() allBills: Bill[] = [];

  sortClients: Customer[] = [];
  sortProducts: Product[] = [];
  sortBills: Bill[] = [];

  clientsChart: any = {
    labels: [] = [],
    series: [] = []
  };

  productsChart: any = {
    labels: [] = [],
    series: [] = []
  };

  billsChart: any = {
    labels: [] = [],
    series: [] = []
  };

  testOutput: any = '';



  constructor() { }

  ngOnInit(): void {
    // this.sortProducts = this.sorter(this.allProducts, 'price');
    this.chartObjectCreator(this.sorter(this.allProducts, 'price'), "catID", 'price' );
    console.log(this.productsChart);
    this.initFirstChart(this.productsChart);
  }

  chartObjectCreator(array: any[], labelsKey: string, seriesKey: string): void {
    this.productsChart.labels = array.map((item) => item[labelsKey].toString());
    this.productsChart.series = [ array.map((item) => item[seriesKey]) ];
    // console.log(this.exempleViewsChart.labels);
    // console.log(this.exempleViewsChart.series);
    // console.log(this.productsChart.labels);

  }

  sorter(array: any[], sortedKey: string = 'id'): any {
    const sortedArray = array.sort(({ [sortedKey]: a }, { [sortedKey]: b }) => b - a).slice(0, 5);
    return sortedArray
  }

  startAnimationForBarChart(chart: any) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data: any) {
      if (data.type === 'bar') {
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

  exempleViewsChart: any = {
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    series: [
      [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
    ]
  };

  initFirstChart(datawebsiteViewsChart: any = {}): void {
    console.log(datawebsiteViewsChart.series);
    const optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
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
    const websiteViewsChart = new Chartist.Bar('#viewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

}
function sort(arg0: string, arg1: string): any {
  throw new Error('Function not implemented.');
}

