import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import {
  orderProcessingFeatureKey,
  IOrderProcessingState,
} from "../reducers/order-processing.reducer";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.css"],
})
export class OrderListComponent implements OnInit {

  searchResult: any = [];

  constructor(private store: Store<IOrderProcessingState>) { }

  public showListOfOrder(){
    this.store
      .select<any>(orderProcessingFeatureKey)
      .subscribe((orderProcessingState: IOrderProcessingState) => {
        this.searchResult = orderProcessingState.orders;
      });
  }

  ngOnInit() {
    this.showListOfOrder();
  }
}
