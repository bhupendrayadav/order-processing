import { Component, OnInit } from '@angular/core';
import { MarketThresholdService } from '../service/market-threshold.service';

@Component({
  selector: 'app-market-threshold',
  templateUrl: './market-threshold.component.html',
  styleUrls: ['./market-threshold.component.css']
})
export class MarketThresholdComponent implements OnInit {
  variances: any = [];
  constructor(private marketThresholdService: MarketThresholdService) { }

  ngOnInit() {
    this.getMarketThresholds();
  }

  getMarketThresholds() {
    this.marketThresholdService.getMarketThreshold().subscribe(res => {
      this.variances = res
    });
  }
}