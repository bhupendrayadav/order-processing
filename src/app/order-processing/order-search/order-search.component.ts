import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { OrderService } from "../../service/order.service";
import * as orderProcessingActions from "../actions/order-processing.actions";
import { Store } from "@ngrx/store";
import {
  orderProcessingFeatureKey,
  IOrderProcessingState,
} from "../reducers/order-processing.reducer";

@Component({
  selector: "app-order-search",
  templateUrl: "./order-search.component.html",
  styleUrls: ["./order-search.component.css"],
})
export class OrderSearchComponent implements OnInit {
  constructor(private orderservice: OrderService,private store: Store<IOrderProcessingState>) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.store.dispatch(orderProcessingActions.fetchOrders({orderId: +form.value.orderNumber}));
  }
}
