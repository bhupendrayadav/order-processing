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
  @Input() chartObject: object;
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
        this.setDonutChart();
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
        text: this.chartObject['title']
      },
      subtitle: {
        text: this.chartObject['subTitle']
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

  setDonutChart() {
    this.options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: this.type
      },
      title: {
        text: this.chartObject['title']
      },
      subtitle: {
        text: this.chartObject['subTitle']
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
      // legend: {
      //   enabled: true,
      //   // layout: 'vertical',
      //   // borderWidth: 0,
      // },
      legend: {
        enabled: true,
        // backgroundColor: '#FFFFFF',
        // floating: true,
        // align: 'left',
        // verticalAlign: 'top',
        // x: 90,
        // y: 45,
        // layout: 'proximate',
        // itemWidth: 75,
        // labelFormatter: function () {
        //   // return this.name + ` \n 0%`;
        // }
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
              color: 'yellow'
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
        text: 'My Productivity Rank              My Quality Rank          <b>My Audit Rank</b>'
      },
      subtitle: {
        text: ''
      },
      credits: {
        enabled: false
      },
      xAxis: {
        gridLineWidth: 0,
        lineWidth: 2,
        lineColor: '#ccc',
      },
      yAxis: {
        min: 30,
        max: 100,
        title: {
          text: "vinoth"
        },
        gridLineWidth: 1,
        lineWidth: 2,
        lineColor: '#ccc',
        labels: {
          formatter: function () {
            // console.log(this.value);
            return this.value + ' km';
          }
        }
      },
      legend: {
        y: 20,
        // layout: 'vertical',
        align: 'center',
        verticalAlign: 'top',
        floating: true
      },
      series: [{
        type: 'line',
        name: 'My Rank',
        data: [20, 35, 50, 80]
      }, {
        type: 'line',
        name: 'Average Peer Rank',
        data: [10, 50, 60, 90]
      }]
    }
  }

}
