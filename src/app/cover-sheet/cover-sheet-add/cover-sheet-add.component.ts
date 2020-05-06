import { Component, OnInit } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { Router } from "@angular/router";
import { Guid } from "guid-typescript";

import { CoverSheetService } from "src/app/service/cover-sheet.service";
import { OrderService } from "src/app/service/order.service";
import { promise } from "protractor";
import { _provideForRootGuard } from "@ngrx/store/src/store_module";

@Component({
  selector: "app-cover-sheet-add",
  templateUrl: "./cover-sheet-add.component.html",
  styleUrls: ["./cover-sheet-add.component.css"],
})
export class CoverSheetAddComponent implements OnInit {
  private isCoverSheetEdit: boolean = false;
  private clientData: any[];
  private productData: any[];
  private clients: any[];
  private products: any[];
  private selectedClients: any[];
  private selectedProducts: any[];
  private BobId: Guid;
  constructor(
    public router: Router,
    private coverSheetService: CoverSheetService,
    private orderService: OrderService
  ) {
    this.BobId = Guid.create();
  }
  setPickListData(clientData, productData) {
    this.clientData = clientData;
    this.productData = productData;
    this.clients = clientData.map(({ id, clientName }) => {
      return {
        id,
        label: clientName,
      };
    });
    this.products = productData.map(({ productGroupId, groupName }) => {
      return {
        id: productGroupId,
        label: groupName,
      };
    });
  }
  getSelectedClients(clients) {
    this.selectedClients = this.clientData.filter((c: any) =>
      clients.find((_c) => c.id === _c.id)
    );
  }

  getSelectedProducts(products) {
    this.selectedProducts = this.productData.filter((p: any) =>
      products.find((_p) => p.productGroupId === _p.id)
    );
  }

  addCoverSheet() {
    const data = {
      clientID: parseInt(this.selectedClients[0].clientID, 10),
      clientName: this.selectedClients[0].clientName,
      productId: this.selectedProducts
        .map((item) => item.productGroupId)
        .toString(),
      productName: this.selectedProducts
        .map((item) => item.groupName)
        .toString(),
      reportType: "Piechart",
      coversheetID: `${this.BobId}`,
    };
    this.coverSheetService.createCoverSheet(data).subscribe((value) => {
      var _confirm = confirm("Cover Sheet added successfully");
      if (_confirm) {
        this.router.navigateByUrl("/cover-sheet");
      }
    });
  }

  ngOnInit() {
    let _clients = this.coverSheetService.getClients();
    let _products = this.coverSheetService.getProducts();
    forkJoin([_clients, _products]).subscribe((result) => {
      this.setPickListData(result[0], result[1].items);
    });
  }
}
