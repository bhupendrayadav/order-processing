import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { FormControl, FormGroup } from '@angular/forms';

interface users{
  userId:number;
  userName:string;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  
  userList1:users[]=[];
  userForm:FormGroup;
  search : FormControl = new FormControl();
  userName:string;
  private _searchTerm: string;
  filteredTaskDetails: any[];
  isTextBoxVisible:boolean=false;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredTaskDetails = this.filterByTaskName(value);
  }
  private _searchTermByOrderNumber: string;
  get searchTermByOrderNumber(): string {
    return this._searchTermByOrderNumber;
  }
  set searchTermByOrderNumber(value: string) {
    this._searchTermByOrderNumber = value;
    this.filteredTaskDetails = this.filterByOrderNumber(value);
  }
  private _searchTermByLoanNumber: string;
  get searchTermByLoanNumber(): string {
    return this._searchTermByLoanNumber;
  }
  set searchTermByLoanNumber(value: string) {
    this._searchTermByLoanNumber = value;
    this.filteredTaskDetails = this.filterByLoanNumber(value);
  }
  taskDetails:any[]=[
      {
        taskName: "Desktop Fulfillment",
        orderNumber: "98000296",
        loanNumber: "338345254",
        transactionType: "Refiance",
        lenderName: "USAA BULK-PARENT",
        submitted:"",
        age:"25",
        clientduedate:"02/15/2019",
        borrower:"",
        address:"",
        country:"",
        state:"",
        loanPurpose:""   ,
        status:"",
        dueDate:"",
      },
      {
        taskName: "Desktop Fulfillment",
        orderNumber: "98000297",
        loanNumber: "438345254",
        transactionType: "Refiance",
        lenderName: "USAA BULK-PARENT",
        submitted:"",
        age:"30",
        clientduedate:"02/15/2019",
        borrower:"",
        address:"",
        country:"",
        state:"",
        loanPurpose:""   ,
        status:"",
        dueDate:"",
      },   
      {
        taskName: "Fulfillment",
        orderNumber: "98000298",
        loanNumber: "238345254",
        transactionType: "Refiance",
        lenderName: "USAA BULK-PARENT",
        submitted:"",
        age:"20",
        clientduedate:"02/15/2019",
        borrower:"",
        address:"",
        country:"",
        state:"",
        loanPurpose:""   ,
        status:"",
        dueDate:"",
      },   
      {
        taskName: "Desktop Fulfillment",
        orderNumber: "98000296",
        loanNumber: "338345254",
        transactionType: "Refiance",
        lenderName: "USAA BULK-PARENT",
        submitted:"",
        age:"25",
        clientduedate:"02/15/2019",
        borrower:"",
        address:"",
        country:"",
        state:"",
        loanPurpose:""   ,
        status:"",
        dueDate:"",
      },
      {
        taskName: "Desktop Fulfillment",
        orderNumber: "98000296",
        loanNumber: "338345254",
        transactionType: "Refiance",
        lenderName: "USAA BULK-PARENT",
        submitted:"",
        age:"25",
        clientduedate:"02/15/2019",
        borrower:"",
        address:"",
        country:"",
        state:"",
        loanPurpose:""   ,
        status:"",
        dueDate:"",
      },
      {
        taskName: "Desktop Fulfillment",
        orderNumber: "98000296",
        loanNumber: "338345254",
        transactionType: "Refiance",
        lenderName: "USAA BULK-PARENT",
        submitted:"",
        age:"25",
        clientduedate:"02/15/2019",
        borrower:"",
        address:"",
        country:"",
        state:"",
        loanPurpose:""   ,
        status:"",
        dueDate:"",
      },
      {
        taskName: "Desktop Fulfillment",
        orderNumber: "98000296",
        loanNumber: "338345254",
        transactionType: "Refiance",
        lenderName: "USAA BULK-PARENT",
        submitted:"",
        age:"25",
        clientduedate:"02/15/2019",
        borrower:"",
        address:"",
        country:"",
        state:"",
        loanPurpose:""   ,
        status:"",
        dueDate:"",
      },
      {
        taskName: "Desktop Fulfillment",
        orderNumber: "98000296",
        loanNumber: "338345254",
        transactionType: "Refiance",
        lenderName: "USAA BULK-PARENT",
        submitted:"",
        age:"25",
        clientduedate:"02/15/2019",
        borrower:"",
        address:"",
        country:"",
        state:"",
        loanPurpose:""   ,
        status:"",
        dueDate:"",
      },
      {
        taskName: "Desktop Fulfillment",
        orderNumber: "98000296",
        loanNumber: "338345254",
        transactionType: "Refiance",
        lenderName: "USAA BULK-PARENT",
        submitted:"",
        age:"25",
        clientduedate:"02/15/2019",
        borrower:"",
        address:"",
        country:"",
        state:"",
        loanPurpose:""   ,
        status:"",
        dueDate:"",
      },
      {
        taskName: "Desktop Fulfillment",
        orderNumber: "98000296",
        loanNumber: "338345254",
        transactionType: "Refiance",
        lenderName: "USAA BULK-PARENT",
        submitted:"",
        age:"25",
        clientduedate:"02/15/2019",
        borrower:"",
        address:"",
        country:"",
        state:"",
        loanPurpose:""   ,
        status:"",
        dueDate:"",
      },
  ];
  

  toggle(){
   this.isTextBoxVisible=!this.isTextBoxVisible;
  }
  filterByTaskName(searchString: string):any[] {
    return this.taskDetails.filter(taskDetail =>
      taskDetail.taskName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  filterByOrderNumber(searchString: string):any[] {
    return this.taskDetails.filter(taskDetail =>
      taskDetail.orderNumber.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  filterByLoanNumber(searchString: string):any[] {
    return this.taskDetails.filter(taskDetail =>
      taskDetail.loanNumber.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  /*getUsersList($event) {
    console.log("called");
    let userName = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    console.log(userName);

    if (userName.length > 3) {
      console.log(userName.length);
        this.userList.getUsersList(userName).subscribe(data=>{
          this.userList1=data.items;
      });
    }
    }*/

  constructor(private userList:UsersService) { }

  ngOnInit() {
    this.filteredTaskDetails = this.taskDetails;
    this.userForm = new FormGroup({
      searchTerm: new FormControl()
   });
    this.search.valueChanges.subscribe(
      term => {
        if (term.length>3) {
          this.userList.getUsersList(term).subscribe(data=>{
            this.userList1=data.items;
            console.log(this.userList1);
      })
    }})
}
}
