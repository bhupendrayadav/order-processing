import { Component, OnInit } from "@angular/core";
import { CoverSheetSerivce } from "src/app/service/cover-sheet.service";
import { OrderService } from "src/app/service/order.service";

@Component({
  selector: "app-cover-sheet-add",
  templateUrl: "./cover-sheet-add.component.html",
  styleUrls: ["./cover-sheet-add.component.css"]
})
export class CoverSheetAddComponent implements OnInit {
  private clients: any[];
  constructor(
    private coverSheetService: CoverSheetSerivce,
    private orderService: OrderService
  ) {}
  setPickListData(data) {
    this.clients = data.map(({ id, clientName }, index) => {
      return {
        id,
        label: clientName
      };
    });
  }
  selectedClients(clients) {
    console.log("clients>>", clients);
  }
  ngOnInit() {
    this.coverSheetService.getClients().subscribe(data => {
      this.setPickListData(data);
    });
  }
}
