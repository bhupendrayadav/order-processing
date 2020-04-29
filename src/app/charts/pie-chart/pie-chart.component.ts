import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'app-pie-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  title = 'Donut Chart';

  private width: number;
  private height: number;

  private svg: any;     // TODO replace all `any` by the right type

  private radius: number;

  private arc: any;
  private pie: any;
  private color: any;

  private g: any;


  dummyData: any[] = [
    { age: 'M', population: 10 },
    { age: 'A', population: 20 },
    { age: 'N', population: 30 },
    { age: 'I', population: 10 },
    { age: 'S', population: 10 },
    { age: 'H', population: 20 }
  ];

  constructor() { }

  ngOnInit() {
    this.initSvg();
    this.drawChart(this.dummyData);
  }

  private initSvg() {
    this.svg = d3.select('svg');

    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.radius = Math.min(this.width, this.height) / 2;

    this.color = d3Scale.scaleOrdinal()
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(this.radius - 70);

    this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.population);

    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  private drawChart(data: any[]) {
    let g = this.svg.selectAll('.arc')
      .data(this.pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', this.arc)
      .style('fill', d => this.color(d.data.age));

    g.append('text')
      .attr('transform', d => 'translate(' + this.arc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text(d => d.data.age);
  }
}
