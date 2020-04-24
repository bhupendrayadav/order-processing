import * as fromOrderProcessing from '../reducers/order-processing.reducer';
import { selectOrderProcessingState } from './order-processing.selectors';

describe('OrderProcessing Selectors', () => {
  it('should select the feature state', () => {
    const result = selectOrderProcessingState({
      [fromOrderProcessing.orderProcessingFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
