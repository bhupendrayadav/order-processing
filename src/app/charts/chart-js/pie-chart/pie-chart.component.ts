import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() data: object;

  constructor() { }

  ngOnInit() {
    if (this.data) {
      let chartElement = document.getElementById('pieChartId');
      this.createChartObject(chartElement);
    }
  }

  createChartObject(domElement) {
    if (domElement) {
      return new Chart(domElement, {
        type: 'pie',
        data: this.data,
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: {
            position: 'bottom',
            display: true,
            labels: {
              // fontColor: 'rgb(255, 99, 132)'
            }
          }
        }
      });
    }
  }

}
