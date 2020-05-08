import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import { ClientConfigService } from "../service/client-config.service";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";

type clientModel = {
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
  providers: [NgbModalConfig, NgbModal],
})
export class ClientConfigComponent implements OnInit {
  errorMessage: string = "";
  searchForm = new FormGroup({
    clientId: new FormControl(""),
    clientName: new FormControl(""),
    legacyNumber: new FormControl(""),
    status: new FormControl(""),
  });
  addNewForm = new FormGroup({
    clientId: new FormControl(""),
    clientName: new FormControl(""),
    legacyNumber: new FormControl(""),
    branch: new FormControl(""),
    status: new FormControl(""),
  });
  records: Array<clientModel> = [];
  constructor(
    private clientConfigService: ClientConfigService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    //config.backdrop = 'static';
    config.keyboard = false;
  }

  public onSearch() {
    this.records = [];
    if (!Object.values(this.searchForm.value).some((item) => Boolean(item))) {
      return (this.errorMessage = "Please provide at least one value");
    }
    this.errorMessage = "";
    this.clientConfigService
      .searchClient(this.searchForm.value)
      .subscribe((value: any) => {
        this.records = value;
      });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          //console.log('result',result);
        },
        (reason) => {
          //console.log('reason',reason);
        }
      );
  }

  addNewClient() {
    let obj = this.addNewForm.getRawValue();
    console.log("obj", obj);
    const newObject = {
      clientId: +obj.clientId,
      clientName: obj.clientName,
      legacyNumber: +obj.legacyNumber,
      branch: obj.branch,
      status: obj.status,
    };
    this.clientConfigService.addNewConfigClient(newObject).subscribe(
      (data) => {
        this.modalService.dismissAll();
        this.addNewForm.reset();
        this.toastr.success("Threshold Updated Successfully.", "Success");
      },
      (error) => this.toastr.error("There is some problem")
    );
  }
  ngOnInit() {}
}
