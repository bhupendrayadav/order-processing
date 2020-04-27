import { TestBed } from '@angular/core/testing';

import { MarketThresholdService } from './market-threshold.service';

describe('MarketThresholdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarketThresholdService = TestBed.get(MarketThresholdService);
    expect(service).toBeTruthy();
  });
});
