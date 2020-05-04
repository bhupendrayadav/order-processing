import { Component, OnInit } from "@angular/core";
import { CoverSheetService } from "src/app/service/cover-sheet.service";

export enum Types {
  SourceClients = "SourceClients",
  SourceProducts = "SourceProducts",
  TargetClients = "TargetClients",
  TargetProducts = "TargetProducts"
}

@Component({
  selector: "app-cover-sheet-add",
  templateUrl: "./cover-sheet-add.component.html",
  styleUrls: ["./cover-sheet-add.component.css"]
})
export class CoverSheetAddComponent implements OnInit {
  private clients: any[];
  private products: any[];
  private selectedSourceClients: any[] = [];
  private selectedTargetClients: any[] = [];
  private selectedSourceProducts: any[] = [];
  private selectedTargetProducts: any[] = [];
  public itemsSourceClients: any[] = [];
  public itemsTargetClients: any[] = [];
  public itemsSourceProducts: any[] = [];
  public itemsTargetProducts: any[] = [];

  constructor(private coverSheetService: CoverSheetService) { }

  handleSelection(emitSelection) {
    this[`selected${emitSelection.type}`] = emitSelection.selectedValues;
  }

  moveSelected(from: Types, to: Types) {
    const items = this[`items${from}`].filter((item: any) => this[`selected${from}`].includes(item.id));

    this[`items${from}`] = this[`items${from}`].filter((item: any) => !this[`selected${from}`].includes(item.id))
    this[`items${to}`] = this[`items${to}`].concat(items);
    this[`selected${from}`] = [];
    this[`selected${to}`] = [];
  }

  moveAll(from: Types, to: Types, sourceName: string) {
    this[`items${from}`] = [];
    this[`items${to}`] = this[`${sourceName}`];
    this[`selected${from}`] = [];
    this[`selected${to}`] = [];
  }

  ngOnInit() {
    this.coverSheetService.getClients().subscribe(data => {
      this.itemsSourceClients = this.clients = data.map(({ id, clientName }) => {
        return {
          id,
          label: clientName
        };
      });
    });
    this.coverSheetService.getProducts().subscribe(data => {
      this.itemsSourceProducts = this.products = data.map((product: any) => {
        return {
          id: product.id,
          label: product.productName
        }
      })
    });
  }
}
