import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OrderProcessingEffects } from './order-processing.effects';

describe('OrderProcessingEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderProcessingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderProcessingEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<OrderProcessingEffects>(OrderProcessingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
