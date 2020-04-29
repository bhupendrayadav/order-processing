import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements OnInit {

  @Input() type: string;
  chart: Chart;
  options: Options;

  constructor() { }

  ngOnInit() {
    if (!this.type) {
      this.type = 'pie';
    }
    switch (this.type) {
      case 'pie':
        this.setPieChart();
        break;

      case 'donut':
        this.setPieChart();
        break;

      case 'line':
        this.setLineChart();
        break;

      default:
        break;
    }

    if (this.type === 'donut') {
      this.options['series'][0]['innerSize'] = '50%'
    }
    this.chart = new Chart(this.options);

  }

  setPieChart() {
    this.options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: this.type
      },
      title: {
        text: 'My Completed Goal'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      credits: {
        enabled: false
      },
      accessibility: {
        point: {
          // valueSuffix: '%'
        }
      },
      legend: {
        enabled: true,
        // layout: 'vertical',
        // borderWidth: 0,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            // format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          },
          showInLegend: true
        }
      },
      series: [
        {
          type: 'pie',
          name: 'Brands',
          colorByPoint: true,
          data: [
            {
              name: 'Yesterday',
              y: 100,
              // sliced: true,
              // selected: true
            },
            {
              name: 'Week',
              y: 0
            },
            {
              name: 'Month',
              y: 0,
              // sliced: true,
              // selected: true
            }
            // {
            //   name: 'Internet Explorer',
            //   y: 12
            // },
            // {
            //   name: 'Firefox',
            //   y: 20
            // },
            // {
            //   name: 'Edge',
            //   y: 5
            // },
            // {
            //   name: 'Safari',
            //   y: 3
            // }
          ]
        }
      ]
    };
  }

  setLineChart() {
    this.options = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      yAxis: {
        min: 30,
        max: 100,
        title: {
          text: "vinoth"
        },
        gridLineWidth: 0,
        labels: {
          formatter: function () {
            console.log(this.value);
            return this.value + ' km';
          }
        }

      },
      legend: {
        y: 25,
      },
      series: [{
        type: 'line',
        name: 'Line 1',
        data: [20, 35, 50, 80]
      }, {
        type: 'line',
        name: 'Line 2',
        data: [10, 50, 60, 90]
      }]
    }
  }

}
