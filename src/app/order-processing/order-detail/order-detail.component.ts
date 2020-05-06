import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../../service/order.service";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.css"],
})
export class OrderDetailComponent implements OnInit {
  private orderId: number;
  public orderDetails:any;
  public productDetails:any;

  constructor(private orderservice: OrderService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.orderId = +params["id"];
      console.log(this.orderId, " orderId");
    });
  }

  public showOderDetails(){
    this.orderservice.getOrderDetails(this.orderId).subscribe((data)=>{
      this.orderDetails = data;
      this.productDetails = this.orderDetails.product;
    })
  }

  ngOnInit() {
    this.showOderDetails();
  }
}
