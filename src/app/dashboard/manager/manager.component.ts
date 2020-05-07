import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface users {
  userId: number;
  userName: string;
}
interface selected {
  taskName: string
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
  loanPurpose: string;
  status: string;
  dueData: string;
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

  checked: any = {};
  isCheckedAll: boolean;
  isAssignButton: boolean = false;

  checkAll(selectedItem: selected[], check: HTMLInputElement) {
    this.checked = {};
    this.isAssignButton = false;

    if (check.checked == true) {
      this.isAssignButton = true;
      selectedItem.forEach(item => this.checked[item.orderNumber] = true);
    }
  }

  checkedItem(selectedItem: selected, check: HTMLInputElement, i) {
    this.isAssignButton = false;

    if (check.checked == true) {
      this.checked[selectedItem.orderNumber] = true;
      this.isAssignButton = true;

      let count = 0;
      for (let key of Object.keys(this.checked)) {
        if (this.checked[key]) {
          count++;
        }
      }
      if (count == this.filteredTaskDetails.length) {
        this.isCheckedAll = true;
      }
    }
    else if (check.checked == false) {
      this.isCheckedAll = false;
      this.checked[selectedItem.orderNumber] = false;
    }
    console.log(this.checked);
  }

  openAssignModel(model) {
    this.assignModalReference = this.modalService.open(model, { ariaLabelledBy: 'modal-basic-title' });
  }

  closeAssignModel() {
    this.assignModalReference.close();
  }

  onAssign() {

  }

  onScroll() {
    console.log('on Scroll');
  }

  onScrollUp() {
    console.log('on scroll up');
  }
}
