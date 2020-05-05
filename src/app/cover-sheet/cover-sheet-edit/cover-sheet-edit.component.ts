import { Component, OnInit } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Guid } from "guid-typescript";

import { CoverSheetService } from "../../service/cover-sheet.service";
import { OrderService } from "../../service/order.service";

@Component({
  selector: 'app-cover-sheet-edit',
  templateUrl: './cover-sheet-edit.component.html',
  styleUrls: ['./cover-sheet-edit.component.css']
})
export class CoverSheetEditComponent implements OnInit {
  private clientData: any[];
  private isCoverSheetEdit: boolean = true;
  private targetClients: any[] = [];
  private targetProducts: any[] = [];
  private productData: any[];
  private clients: any[];
  private products: any[];
  private selectedClients: any[];
  private selectedProducts: any[];
  private BobId: Guid;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private coverSheetService: CoverSheetService,
    private orderService: OrderService
  ) {
    this.BobId = Guid.create();
  }
  setPickListData(clientData, productData) {
    this.clientData = clientData;
    this.productData = productData;
    this.clients = clientData.map(({ id, clientID, clientName }) => {
      return {
        id,
        clientID,
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
    const _clients = this.coverSheetService.getClients();
    const _products = this.coverSheetService.getProducts();
    forkJoin([_clients, _products]).subscribe((result) => {
      this.setPickListData(result[0], result[1].items);

      this.route.params.subscribe((params) => {
        const clientID = params["id"];

        this.targetClients = this.clients.filter((item) => item.clientID === +clientID);
        this.clients = this.clients.filter((item) => item.clientID !== +clientID);
        //this.targetProducts = this.products.filter((item) => item.productName === this.targetClients[0].productName);
        //this.products = this.products.filter((item) => item.productName !== this.targetClients[0].productName);
      });
    });
  }
}
