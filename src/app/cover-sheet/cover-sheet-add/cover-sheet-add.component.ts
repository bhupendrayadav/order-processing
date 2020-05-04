import { Component, OnInit } from "@angular/core";
import { Observable, forkJoin } from "rxjs";

import { CoverSheetService } from "src/app/service/cover-sheet.service";
import { OrderService } from "src/app/service/order.service";

@Component({
  selector: "app-cover-sheet-add",
  templateUrl: "./cover-sheet-add.component.html",
  styleUrls: ["./cover-sheet-add.component.css"],
})
export class CoverSheetAddComponent implements OnInit {
  private clients: any[];
  private products: any[];
  constructor(
    private coverSheetService: CoverSheetService,
    private orderService: OrderService
  ) {}
  setPickListData(clientData, productData) {
    this.clients = clientData.map(({ id, clientName }, index) => {
      return {
        id,
        label: clientName,
      };
    });
    this.products = productData.map(({ productGroupId, groupName }, index) => {
      return {
        id: productGroupId,
        label: groupName,
      };
    });
  }
  selectedClients(clients) {
    console.log("clients>>", clients);
  }

  selectedProducts(products) {
    console.log("products>>", products);
  }

  ngOnInit() {
    let _clients = this.coverSheetService.getClients();
    let _products = this.coverSheetService.getProducts();
    forkJoin([_clients, _products]).subscribe((result) => {
      this.setPickListData(result[0], result[1].items);
    });
  }
}
