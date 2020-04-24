import { createAction, props } from "@ngrx/store";

export enum ActionTypes {
  FETCH_ORDERS = "[OrderProcessing] Fetch Orders",
  FETCH_ORDERS_SUCCESS = "[OrderProcessing] Fetch Orders Success",
  FETCH_ORDERS_FAILURE = "[OrderProcessing] Fetch Orders Failure",
}

export const fetchOrders = createAction(ActionTypes.FETCH_ORDERS);

export const fetchOrdersSuccess = createAction(
  ActionTypes.FETCH_ORDERS_SUCCESS,
  props<{ data: any }>()
);

export const fetchOrdersFailure = createAction(
  ActionTypes.FETCH_ORDERS_FAILURE,
  props<{ error: any }>()
);
