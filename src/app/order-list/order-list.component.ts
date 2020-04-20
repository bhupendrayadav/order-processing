import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: any = [];
  searchResult: any = []

  constructor(private orderservice: OrderService) {
    this.orderservice.getOrderNumber().subscribe((item) => {
      this.searchResult = item.orderNumber ? this.orders.filter((order: any) => order.orderNumber == item.orderNumber): this.orders;
    });
  }

  ngOnInit() {
    this.orderservice.getOrderList().subscribe((response) => {
        this.searchResult = this.orders = response;
    });
  }
}
