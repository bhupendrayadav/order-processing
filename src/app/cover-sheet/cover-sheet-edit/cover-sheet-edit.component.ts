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

  editCoverSheet() {
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
    if (this.selectedProducts.length && this.selectedClients.length) {
      this.coverSheetService.editCoverSheet(data).subscribe((value) => {
        var _confirm = confirm("Cover Sheet edited successfully");
        if (_confirm) {
          this.router.navigateByUrl("/cover-sheet");
        }
      });
    }
  }

  ngOnInit() {
    const _clients = this.coverSheetService.getClients();
    const _products = this.coverSheetService.getProducts();
    forkJoin([_clients, _products]).subscribe((result) => {
      this.setPickListData(result[0], result[1].items);

      this.route.params.subscribe((params) => {
        const clientID = params["id"];
        const productIds = this.route.snapshot.queryParams.productIds.split(",").map((pid) => +pid);
        this.targetClients = this.clients.filter((item) => item.clientID === +clientID);
        this.BobId = this.route.snapshot.queryParams.BobId

        this.clients = this.clients.filter((item) => item.clientID !== +clientID);
        this.targetProducts = this.products.filter((item) => productIds.includes(item.id));
        this.getSelectedClients(this.targetClients);
        this.getSelectedProducts(this.targetProducts);
        this.products = this.products.filter((item) => !productIds.includes(item.id));
      });
    });
  }
}
