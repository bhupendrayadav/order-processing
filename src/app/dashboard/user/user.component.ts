import { ToastrService } from 'ngx-toastr';
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

  page = 1;
  pageSize = 10;
  totalRecords: number = 0;
  selectedUser: object;

  isLoading = false;

  userSearch: string = '';

  userListTotal: users[] = [];
  userList: users[] = [];
  userForm: FormGroup;
  search: FormControl = new FormControl();
  userName: string;
  private _searchTerm: string;
  tasksList: any[];
  isTextBoxVisible: boolean = false;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.tasksList = this.filterByTaskName(value);
  }
  private _searchTermByOrderNumber: string;
  get searchTermByOrderNumber(): string {
    return this._searchTermByOrderNumber;
  }
  set searchTermByOrderNumber(value: string) {
    this._searchTermByOrderNumber = value;
    this.tasksList = this.filterByOrderNumber(value);
  }
  private _searchTermByLoanNumber: string;
  get searchTermByLoanNumber(): string {
    return this._searchTermByLoanNumber;
  }
  set searchTermByLoanNumber(value: string) {
    this._searchTermByLoanNumber = value;
    this.tasksList = this.filterByLoanNumber(value);
  }
  taskDetails: any[] = [
    /* {
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
      orderNumber: "",
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
    } */
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

  constructor(private _userService: UsersService, private toastr: ToastrService) { }

  ngOnInit() {
    this.tasksList = this.taskDetails;
    /* this.userForm = new FormGroup({
      searchTerm: new FormControl()
    }); */
    /* this.search.valueChanges.subscribe(
      term => {
        if (term.length > 3) {
          console.log('term', term);
          this._userService.getUsersList(term).subscribe(data => {
            this.userList = data.items;
            console.log(this.userList);
          })
        }
      }); */

        this.selectedUser = {};
        this.selectedUser['userID'] = 104;
        this.getTasksList();
  }

  /**
   * @description Method to get Searched User List
   * @author Krunal Shriram Sakharkar
   * @date 2020-05-07
   * @param {*} value
   * @memberof UserComponent
   */
  getUsersList(value) {
    if (this.userList.length) {
      this.selectedUser = this.userList.find(f => f.userName === value);
      this.resetList();
      this.getTasksList();
    }
    if (!this.selectedUser) {
      this.userList = [];
      if (value.length > 3) {
        this._userService.getUsersList(value).subscribe(data => {
          this.userList = data.items;
        });
      }
    }
  }

  /**
   * @description Metho to Get Tasks
   * @author Krunal
   * @date 2020-05-07
   * @memberof UserComponent
   */
  getTasksList() {
    if (this.selectedUser && this.selectedUser['userID']) {
      this.isLoading = true;
      const payload = `userId=${this.selectedUser['userID']}&page=${this.page}&pageSize=${this.pageSize}`;
      this._userService.getTasksList(payload).subscribe({
        next: result => {
          // console.log('result', result);
          if (result['items'] && result['items'].length) {
            this.addTasksToTasksList(result['items']);
            this.totalRecords = result['totalrows'];
          } else {
            this.isLoading = false;
          }
        },
        error: error => this.toastr.error('Server Error', 'Error')
      });
    }
  }

  /**
   * @description Method to a Tasks in Table Task List
   * @author Krunal
   * @date 2020-05-07
   * @param {*} data
   * @memberof UserComponent
   */
  addTasksToTasksList(data) {
    data.forEach((item, index) => {
      this.tasksList.push(item);
      if (index === (data.length - 1)) {
        this.isLoading = false;
        // console.log('Length', this.tasksList.length);
      }
    });
  }

  /**
   * @description Metho to get Next Tasks On scroll
   * @author Krunal
   * @date 2020-05-07
   * @memberof UserComponent
   */
  onScroll() {
    this.page++;
    this.getTasksList();
    console.log('on Scroll');
  }

  resetList() {
    this.page = 1;
    this.pageSize = 10;
    this.totalRecords = 0;
    this.tasksList = [];
  }

  onScrollUp() {
    console.log('on scroll up');
  }

}
