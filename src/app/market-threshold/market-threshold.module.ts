import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketThresholdRoutingModule } from './market-threshold-routing.module';
import { MarketThresholdComponent } from './market-threshold.component';


@NgModule({
  declarations: [MarketThresholdComponent],
  imports: [
    CommonModule,
    MarketThresholdRoutingModule
  ]
})
export class MarketThresholdModule { }
