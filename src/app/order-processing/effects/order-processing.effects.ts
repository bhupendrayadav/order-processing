import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, concatMap } from "rxjs/operators";
import { of } from "rxjs";

import * as OrderProcessingActions from "../actions/order-processing.actions";
import { OrderService } from "../../service/order.service";

@Injectable()
export class OrderProcessingEffects {
  loadOrderProcessings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderProcessingActions.fetchOrders),
      concatMap(() =>
        this.orderService.getOrderList().pipe(
          map((data) => OrderProcessingActions.fetchOrdersSuccess({ data })),
          catchError((error) =>
            of(OrderProcessingActions.fetchOrdersFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private orderService: OrderService, private actions$: Actions) {}
}
