import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import { ClientConfigService } from "../service/client-config.service";

type clientModel = {
  id: string;
  clientId: number;
  clientName: string;
  legacyNumber: number;
  branch: string;
  status: string;
};

@Component({
  selector: "app-client-config",
  templateUrl: "./client-config.component.html",
  styleUrls: ["./client-config.component.css"],
})
export class ClientConfigComponent implements OnInit {
  isAddModalVisible: boolean = false;
  errorMessage: string = "";
  searchForm = new FormGroup({
    clientId: new FormControl(""),
    clientName: new FormControl(""),
    legacyNumber: new FormControl(""),
    status: new FormControl(""),
  });
  records: clientModel[] = [];
  constructor(private clientConfigService: ClientConfigService) {}
  toggleAddModal(flag: boolean): void {
    this.isAddModalVisible = flag;
  }
  onSearch() {
    if (!Object.values(this.searchForm.value).some((item) => Boolean(item))) {
      return (this.errorMessage = "Please provide at least one value");
    }
    this.errorMessage = "";
    this.clientConfigService
      .searchClient(this.searchForm.value)
      .subscribe((value) => console.log("value", value));
  }
  ngOnInit() {}
}
