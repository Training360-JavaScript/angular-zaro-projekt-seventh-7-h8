import { Component, Input, OnInit } from '@angular/core';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Product } from 'src/app/model/product';

import * as Chartist from 'chartist';
import { Order } from 'src/app/model/order';

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
  @Input() allOrders: Order[] = [];

  chartExemple: any = {
    labels: [] = [],
    series: [] = []
  };

  chartsArray: any = []; //[ allOrders, productsChart, billsChart ]
  chartTitle: string[] = [ 'allOrders', 'productsChart', 'billsChart' ]
  chartTitleNow: string = '';
  testOutput: any = [];


  constructor() { }

  ngOnInit(): void {
    // this.chartObjectCreator(array: any[], sortingKey: string, seriesKey: string, labelsKey: string)
    this.chartsArray[0] = this.chartObjectCreator(this.allOrders, 'product.price', 'product.price', "product.category.name");
    this.chartsArray[1] = this.chartObjectCreator(this.allProducts, 'price', 'price', "catID");
    this.chartsArray[2] = this.chartObjectCreator(this.allBills, "order.product.price", "order.product.price", "order.product.category.name");

    this.chartTitleNow = this.chartTitle[0]
    this.initFirstChart(this.chartsArray[0], 30);

    this.chartsStarter();
    // console.log('onInint start:  initFirstChart', this.chartsArray[0]);
  }

  i: number = 0;

  chartsStarter(): void {
    setTimeout(() => {
      this.i += 1;
      if (this.i <= 2) {
        // console.log('initFirstChart', this.i, this.chartsArray[this.i]);
        this.chartTitleNow = this.chartTitle[this.i]
        this.initFirstChart(this.chartsArray[this.i], 30);
        this.chartsStarter();
      } else {
        this.i = 0
        // console.log('ELSEinitFirstChart', this.i, this.chartsArray[this.i]);
        this.chartTitleNow = this.chartTitle[this.i]
        this.initFirstChart(this.chartsArray[this.i], 30);
        this.chartsStarter();
      }
    }, 4500);
  }

  chartObjectCreator(array: any[], sortingKey: string, seriesKey: string, labelsKey: string): any {
    let sortedArray: any[] = this.sorter(array, sortingKey)
    let obj: any = {}
    obj.labels = sortedArray.map((item) => item[labelsKey].toString());
    obj.series = [sortedArray.map((item) => item[seriesKey])];
    return obj
  }

  sorter(array: any[], sortedKey: string = 'id'): any {
    const sortedArray = array.sort(({ [sortedKey]: a }, { [sortedKey]: b }) => b - a).slice(0, 5);
    return sortedArray
  }

  startAnimationForBarChart(chart: any) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 100;
    delays2 = 80;
    durations2 = 3000;
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

  initFirstChart(datawebsiteViewsChart: any = {}, plusValue: number = 0): void {
    const optionswebsiteViewsChart = {
      axisX: {
        showGrid: true
      },
      low: 0,
      high: datawebsiteViewsChart.series[0][0] + plusValue,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    const responsiveOptions: any[] = [
      ['screen and (max-width: 12000x)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value: any) {
            return value[1];
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

