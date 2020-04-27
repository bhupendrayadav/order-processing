import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketThresholdComponent } from './market-threshold.component';

describe('MarketThresholdComponent', () => {
  let component: MarketThresholdComponent;
  let fixture: ComponentFixture<MarketThresholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketThresholdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
