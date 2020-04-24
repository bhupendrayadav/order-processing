import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../service/order.service";
import { Store } from "@ngrx/store";

import {
  orderProcessingFeatureKey,
  IOrderProcessingState,
} from "../reducers/order-processing.reducer";
import * as orderProcessingActions from "../actions/order-processing.actions";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.css"],
})
export class OrderListComponent implements OnInit {
  orders: any = [];
  searchResult: any = [];

  constructor(
    private orderservice: OrderService,
    private store: Store<IOrderProcessingState>
  ) {
    this.orderservice.getOrderNumber().subscribe((item) => {
      this.searchResult = item.orderNumber
        ? this.orders.filter(
            (order: any) => order.orderNumber == item.orderNumber
          )
        : this.orders;
    });
  }

  ngOnInit() {
    this.store.dispatch(orderProcessingActions.fetchOrders());
    this.store
      .select<any>(orderProcessingFeatureKey)
      .subscribe((orderProcessingState: IOrderProcessingState) => {
        this.searchResult = this.orders = orderProcessingState.orders;
        console.log(
          orderProcessingState,
          " orderProcessingState in order-list component nginit"
        );
      });
  }
}
