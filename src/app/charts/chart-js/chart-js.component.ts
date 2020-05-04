import { Component, OnInit, Input, OnChanges } from '@angular/core';
import Chart from 'chart.js';
import { Observable, Subscriber, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
// import * as moment from 'moment';

const chartSrcUrl = 'path/to/chartjs/dist/Chart.js';

@Component({
  selector: 'app-chart-js',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.css']
})
export class ChartJsComponent implements OnInit, OnChanges {
  @Input() chartType: string = 'pie';
  showChart = false;
  constructor() { }

  ngOnInit() {
    this.loadChartScript();
  }

  loadChartScript() {

    // var scripts = Array.prototype.slice.call(document.scripts);
    // scripts.some(function (el) {
    //   console.log('el.src', el.src);
    // });

    let observer = new Observable((subscriber: Subscriber<boolean>) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = chartSrcUrl;
      script.onload = () => {
        subscriber.next(true);
      };
      script.onerror = (error: any) => {
        return throwError(false);
      };
      document.getElementsByTagName("head")[0].appendChild(script);
    });
    return observer.pipe(delay(1000));
  }

  ngOnChanges() {
    let chartId = 'pieChart';
    if (this.chartType === 'doughnut') {
      chartId = 'doughnutChart';
    }

    if (this.chartType) {
      var ctx = document.getElementById('abcd');
      var myChart = new Chart(ctx, {
        type: this.chartType,
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of Votes',
              // data: [100],
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
    this.showChart = true;
  }

}
