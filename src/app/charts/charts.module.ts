import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HighchartsComponent } from './highcharts/highcharts.component';
import { ChartModule } from 'angular-highcharts';
import { ChartJsComponent } from './chart-js/chart-js.component';

@NgModule({
  declarations: [PieChartComponent, HighchartsComponent, ChartJsComponent],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [PieChartComponent, HighchartsComponent, ChartJsComponent],
})
export class ChartsModule { }
