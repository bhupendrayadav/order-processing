import { Component, OnInit,OnDestroy } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription } from 'rxjs';

import { ClientConfigService } from "../service/client-config.service";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  providers: [NgbModalConfig, NgbModal]
})
export class ClientConfigComponent implements OnInit,OnDestroy {
  errorMessage: string = '';
  searchForm = new FormGroup({
    clientId: new FormControl(''),
    clientName: new FormControl(''),
    legacyNumber: new FormControl(''),
    status: new FormControl(''),
  });
  addNewForm = new FormGroup({
    clientId: new FormControl(''),
    clientName: new FormControl(''),
    legacyNumber: new FormControl(''),
    branch: new FormControl(''),
    status: new FormControl('')
  });
  private searchSubscription: Subscription;
  private addSubscription: Subscription;
  records: Array<clientModel> =[];
  constructor(private clientConfigService: ClientConfigService,config: NgbModalConfig, private modalService: NgbModal) {
    //config.backdrop = 'static';
      config.keyboard = false;
  }

  public onSearch() {
    if (!Object.values(this.searchForm.value).some((item) => Boolean(item))) {
      return (this.errorMessage = "Please provide at least one value");
    }
    this.errorMessage = "";
    this.searchSubscription = this.clientConfigService
      .searchClient(this.searchForm.value)
      .subscribe((value:any) =>{
        this.records = value
      });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //console.log('result',result);
    }, (reason) => {
      //console.log('reason',reason);
    });
  }

  addNewClient() {
    this.modalService.dismissAll();
    let obj = this.addNewForm.getRawValue();
    const newObject = {ClientId:+obj.clientId ,  ClientName:obj.clientName , LegacyNumber:+obj.legacyNumber , Branch:obj.branch , Status:obj.status }
    this.addSubscription = this.clientConfigService.addNewConfigClient(newObject).subscribe((data)=>{
      //console.log('data',data)
    })
   }
  ngOnInit() {}
  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
    this.addSubscription.unsubscribe();
  }
}
