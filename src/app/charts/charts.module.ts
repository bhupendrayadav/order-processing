import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsComponent } from './highcharts/highcharts.component';
import { ChartModule } from 'angular-highcharts';
import { ChartJsComponent } from './chart-js/chart-js.component';
import { DoughnutChartComponent } from './chart-js/doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './chart-js/pie-chart/pie-chart.component';
import { LineChartComponent } from './chart-js/line-chart/line-chart.component';

@NgModule({
  declarations: [
    PieChartComponent,
    HighchartsComponent,
    ChartJsComponent,
    DoughnutChartComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    PieChartComponent,
    HighchartsComponent,
    ChartJsComponent,
    DoughnutChartComponent,
    LineChartComponent
  ],
})
export class ChartsModule { }
