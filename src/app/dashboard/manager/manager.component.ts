import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface users {
  userId: number;
  userName: string;
}
interface selected {
  taskName:string
  orderNumber: string;
  loanNumber: string;
  transactionType: string;
  lenderName: string;
  submitted: string;
  age: string;
  clientduedate: string;
  orderNumbborrowerer: string;
  address: string;
  country: string;
  state: string;
  loanPurpose:string;
  status:string;
  dueData:string;
}

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  // For user search
  search: FormControl = new FormControl();
  usersList: users[] = [];

  // For Assign modal
  assignModalReference: NgbModalRef;
  searchUser: FormControl = new FormControl();

  // For table
  filteredTaskDetails: any[];
  taskDetails: any[] = [
    {
      taskName: "Desktop Fulfillment",
      orderNumber: "98000296",
      loanNumber: "338345254",
      transactionType: "Refiance",
      lenderName: "USAA BULK-PARENT",
      submitted: "",
      age: "25",
      clientduedate: "02/15/2019",
      borrower: "",
      address: "",
      country: "",
      state: "",
      loanPurpose: "",
      status: "",
      dueDate: "",
    },
    {
      taskName: "Desktop Fulfillment",
      orderNumber: "98000297",
      loanNumber: "438345254",
      transactionType: "Refiance",
      lenderName: "USAA BULK-PARENT",
      submitted: "",
      age: "30",
      clientduedate: "02/15/2019",
      borrower: "",
      address: "",
      country: "",
      state: "",
      loanPurpose: "",
      status: "",
      dueDate: "",
    },
    {
      taskName: "Fulfillment",
      orderNumber: "98000298",
      loanNumber: "238345254",
      transactionType: "Refiance",
      lenderName: "USAA BULK-PARENT",
      submitted: "",
      age: "20",
      clientduedate: "02/15/2019",
      borrower: "",
      address: "",
      country: "",
      state: "",
      loanPurpose: "",
      status: "",
      dueDate: "",
    },
    {
      taskName: "Desktop Fulfillment",
      orderNumber: "98000299",
      loanNumber: "338345254",
      transactionType: "Refiance",
      lenderName: "USAA BULK-PARENT",
      submitted: "",
      age: "25",
      clientduedate: "02/15/2019",
      borrower: "",
      address: "",
      country: "",
      state: "",
      loanPurpose: "",
      status: "",
      dueDate: "",
    },
    {
      taskName: "Desktop Fulfillment",
      orderNumber: "98000300",
      loanNumber: "338345254",
      transactionType: "Refiance",
      lenderName: "USAA BULK-PARENT",
      submitted: "",
      age: "25",
      clientduedate: "02/15/2019",
      borrower: "",
      address: "",
      country: "",
      state: "",
      loanPurpose: "",
      status: "",
      dueDate: "",
    },
    {
      taskName: "Desktop Fulfillment",
      orderNumber: "98000301",
      loanNumber: "338345254",
      transactionType: "Refiance",
      lenderName: "USAA BULK-PARENT",
      submitted: "",
      age: "25",
      clientduedate: "02/15/2019",
      borrower: "",
      address: "",
      country: "",
      state: "",
      loanPurpose: "",
      status: "",
      dueDate: "",
    },
    {
      taskName: "Desktop Fulfillment",
      orderNumber: "98000302",
      loanNumber: "338345254",
      transactionType: "Refiance",
      lenderName: "USAA BULK-PARENT",
      submitted: "",
      age: "25",
      clientduedate: "02/15/2019",
      borrower: "",
      address: "",
      country: "",
      state: "",
      loanPurpose: "",
      status: "",
      dueDate: "",
    },
    {
      taskName: "Desktop Fulfillment",
      orderNumber: "98000303",
      loanNumber: "338345254",
      transactionType: "Refiance",
      lenderName: "USAA BULK-PARENT",
      submitted: "",
      age: "25",
      clientduedate: "02/15/2019",
      borrower: "",
      address: "",
      country: "",
      state: "",
      loanPurpose: "",
      status: "",
      dueDate: "",
    },
    {
      taskName: "Desktop Fulfillment",
      orderNumber: "98000304",
      loanNumber: "338345254",
      transactionType: "Refiance",
      lenderName: "USAA BULK-PARENT",
      submitted: "",
      age: "25",
      clientduedate: "02/15/2019",
      borrower: "",
      address: "",
      country: "",
      state: "",
      loanPurpose: "",
      status: "",
      dueDate: "",
    },
    {
      taskName: "Desktop Fulfillment",
      orderNumber: "98000305",
      loanNumber: "338345254",
      transactionType: "Refiance",
      lenderName: "USAA BULK-PARENT",
      submitted: "",
      age: "25",
      clientduedate: "02/15/2019",
      borrower: "",
      address: "",
      country: "",
      state: "",
      loanPurpose: "",
      status: "",
      dueDate: "",
    },
  ];

  constructor(private dashboardService: UsersService, private modalService: NgbModal) { }

  ngOnInit() {
    this.filteredTaskDetails = this.taskDetails;

    this.search.valueChanges.subscribe(term => {
      if (term.length > 3) {
        this.dashboardService.getUsersList(term).subscribe(data => {
          this.usersList = data.items;
        })
      }
    });
  }
  checkedItems:selected[]=[];
  isChecked:boolean=false;
  isCheckedAll:boolean;
  checkAll(selectedItem:selected[],check:HTMLInputElement)
  {
    if(check.checked==true){
      this.isChecked=true;
      Object.assign(this.checkedItems,selectedItem);
      console.log(this.checkedItems);
      }
      else if(check.checked==false)
    { 
      this.isChecked=false;
      this.checkedItems.splice(0,this.checkedItems.length);
      this.filteredTaskDetails = this.taskDetails;
      console.log(this.checkedItems);
    }

  }
  checkedItem(selectedItem:selected,check:HTMLInputElement,i)
  { 
    if(check.checked==true){
    this.checkedItems.push(selectedItem);
     if(this.checkedItems.length==this.filteredTaskDetails.length)
     {
       this.isCheckedAll=true;
     }
    }
    else if(check.checked==false)
    { 
      this.isCheckedAll=false;
     let pos:number;
      pos= this.checkedItems.findIndex(x => x.orderNumber ==selectedItem.orderNumber);
      this.checkedItems.splice(pos,1);
    }

    console.log(this.checkedItems);
  }
  openAssignModel(model) {
    this.assignModalReference = this.modalService.open(model, { ariaLabelledBy: 'modal-basic-title' });
  }

  closeAssignModel() {
    this.assignModalReference.close();
  }

  onAssign() {

  }
  
}
