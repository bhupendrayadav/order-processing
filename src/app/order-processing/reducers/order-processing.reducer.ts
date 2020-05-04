import { Action, createReducer, on } from "@ngrx/store";
import * as OrderProcessingActions from "../actions/order-processing.actions";

export const orderProcessingFeatureKey = "orderProcessing";

export interface IOrderProcessingState {
  orders: any[];
}

export const initialState: IOrderProcessingState = {
  orders: []
};

const orderProcessingReducers = createReducer(
  initialState,
  on(OrderProcessingActions.fetchOrders, (state) => state),
  on(OrderProcessingActions.fetchOrdersSuccess, (state, action) => {
    return {
      ...state,
      orders: action.data,
    };
  }),
  on(OrderProcessingActions.fetchOrdersFailure, (state, action) => state)
);

export function reducer(state: IOrderProcessingState | undefined, action: Action) {
  return orderProcessingReducers(state, action);
}
