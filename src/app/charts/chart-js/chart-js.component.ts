import { Component, OnInit, Input, OnChanges, AfterContentInit } from '@angular/core';
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
export class ChartJsComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() chartType: string = 'pie';
  showChart = false;
  chartId = '';
  constructor() { }

  ngOnInit() {
    let divId = Math.random().toString(36).substr(2, 5);
    var divElement = document.createElement("div");
    divElement.setAttribute('id', divId);

    var canv = document.createElement("canvas");
    canv.setAttribute('width', '50px');
    canv.setAttribute('height', '50px');
    let aStr = Math.random().toString(36).substr(2, 5);
    canv.setAttribute('id', aStr);
    this.createChartObject(canv);

    document.getElementById('chartId').appendChild(canv)
    // document.body.appendChild(divElement).appendChild(canv);

    // Code to Load static Chart
    // this.createChart();
  }

  ngOnChanges() {
    // this.createChartObject();
    // this.chartId = Math.random().toString(36).substr(2, 5);

    // var divElement = document.getElementById('chartId');
    // if (divElement) {
    //   var script = document.createElement("canvas");
    //   script.id = this.chartId;
    //   script.height = 100;
    //   script.width = 100;
    //   // divElement.appendChild(script);
    //   divElement.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
    //   document.body.append(divElement);
    //   this.showChart = true

    // this.createChartObject();
    // }
    // document.body.appendChild(divElement);
    // this.addHtmlForChart();


    /* let context = document.getElementsByTagName('canvas');
    this.createChartObject(context); */
  }

  ngAfterContentInit() {
    /* this.chartId = Math.random().toString(36).substr(2, 5);

    var divElement = document.getElementById('chartId');
    if (divElement) {
      var script = document.createElement("canvas");
      script.id = this.chartId;
      script.height = 100;
      script.width = 100;
      // divElement.appendChild(script);
      divElement.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
      document.body.append(divElement);
      this.showChart = true
    } */
  }

  addHtmlForChart() {
    /* var divElement = document.createElement('div');
    divElement.id = this.chartDivId;
    divElement.innerHTML = "This is a DIV";
    document.body.appendChild(divElement);
    document.getElementById(this.chartDivId).appendChild(divElement);

    var script = document.createElement("canvas");
    script.id = this.chartId;
    script.height = 100;
    script.width = 100;
    // document.body.appendChild(script);
    let _x = document.getElementById(this.chartDivId);
    console.log('_x', _x); */
    // document.getElementById(this.chartDivId).appendChild(script);
    // document.getElementById(this.chartDivId).appendChild( `<canvas id="chartId" width="100px" height="100px"></canvas>`);


    // var divElement = document.createElement('div_' + this.chartId);
    // divElement.appendChild(script);
    // document.getElementById("chartIds").appendChild(script);
    this.createChartObject();
  }

  createChartObject(domElement = null) {
    // var domElement = document.getElementsByClassName(this.chartId);
    // var domElement = document.getElementById(this.chartId);
    // if (domElement) {
    console.log('domElement', domElement);
    if (domElement) {
      return new Chart(domElement, {
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
            }
          ]
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

    // }

  }

  createChart() {
    // console.log('this.chartIdInput', this.chartIdInput);
    var domElement = document.getElementById('chartId');
    // var domElement_1 = document.querySelector('.abcd');
    // console.log('domElement_1', domElement_1);
    if (domElement) {
     /*  var myChart = new Chart(domElement, {
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
      }); */
    }

  }
}
