import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {
  constructor(private orderservice: OrderService) { }

  ngOnInit() {
   
  }

  onSubmit(form: NgForm) {
    this.orderservice.sendOrderNumber(form.value);
  }
}
