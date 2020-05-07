import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { FormControl, FormGroup } from '@angular/forms';

interface users {
  userId: number;
  userName: string;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  userSearch: string = '';
  selectedUser: object;

  userListTotal: users[] = [];
  userList: users[] = [];
  userForm: FormGroup;
  search: FormControl = new FormControl();
  userName: string;
  private _searchTerm: string;
  filteredTaskDetails: any[];
  isTextBoxVisible: boolean = false;
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
  ];

  pieChart: object = {
    labels: ['Yesterday', 'Week', 'Month'],
    datasets: [
      {
        label: '# of Votes',
        data: [10, 0, 0],
        backgroundColor: [
          'rgba(124,181,236,1)'
        ],
        borderColor: [
          'rgba(124,181,236,1)'
        ],
        borderWidth: 1
      }
    ]
  };

  doughnutChart: object = {
    labels: ['Yesterday', 'Week', 'Month'],
    datasets: [
      {
        label: '# of Votes',
        data: [10, 0, 0],

        backgroundColor: [
          'rgba(255,255,0,0.7)'
        ],
        borderColor: [
          'rgba(255,255,0,0.7)'
        ],
        borderWidth: 1
      }
    ]
  };

  lineChart: object = {
    labels: ['Blue', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [5, 9, 15, 7, 3],
        backgroundColor: [
          'rgba(0, 0, 0, 0)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  highchartPie: object = {
    title: 'Review Decision',
    // subTitle: '<b>Request Decision</b>'
    // title: 'Review Decision <b>Request Decision</b>'
  }

  highchartDounut: object = {
    title: 'My Completed Goal'
  }

  toggle() {
    this.isTextBoxVisible = !this.isTextBoxVisible;
  }
  filterByTaskName(searchString: string): any[] {
    return this.taskDetails.filter(taskDetail =>
      taskDetail.taskName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  filterByOrderNumber(searchString: string): any[] {
    return this.taskDetails.filter(taskDetail =>
      taskDetail.orderNumber.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  filterByLoanNumber(searchString: string): any[] {
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
          this.userList=data.items;
      });
    }
    }*/

  constructor(private _userService: UsersService) { }

  ngOnInit() {
    this.filteredTaskDetails = this.taskDetails;
    this.userForm = new FormGroup({
      searchTerm: new FormControl()
    });
    this.search.valueChanges.subscribe(
      term => {
        if (term.length > 3) {
          console.log('term', term);
          this._userService.getUsersList(term).subscribe(data => {
            this.userList = data.items;
            console.log(this.userList);
          })
        }
      })
  }

  getUsersList(value) {
    console.log('value', value);
    let _obj;
    if (this.userList.length) {
      this.selectedUser = this.userList.find(f => f.userName === value);
      console.log('selectedUser', this.selectedUser);
    }

    // let userId = (<HTMLInputElement>document.getElementById('user')).value;
    // console.log('userId', userId);
    this.userList = [];
    if (value.length > 3) {
      this._userService.getUsersList(value).subscribe(data => {
        this.userList = data.items;
        // this.userListTotal = data.items;
        // console.log('getUsersList Result', this.userListTotal.length);
        // this.getNextSearchedRecord();
      })
    }
  }

  getNextSearchedRecord() {
    let presentRecord = this.userList.length;
    const startIndex = (this.userList.length === 0) ? 0 : (this.userList.length - 1);
    const endIndex = startIndex + 15;
    // console.log('startIndex - endIndex', startIndex, endIndex);
    this.userListTotal.slice(startIndex, endIndex).map((item, i) => {
      this.userList.push(item);
    });

  }

}
