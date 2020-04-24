import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromOrderProcessing from "../reducers/order-processing.reducer";

export const selectOrderProcessingState = createFeatureSelector<
  fromOrderProcessing.IOrderProcessingState
>(fromOrderProcessing.orderProcessingFeatureKey);
