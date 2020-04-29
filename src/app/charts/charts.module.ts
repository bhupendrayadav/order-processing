import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HighchartsComponent } from './highcharts/highcharts.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [PieChartComponent, HighchartsComponent],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [PieChartComponent, HighchartsComponent]
})
export class ChartsModule { }
