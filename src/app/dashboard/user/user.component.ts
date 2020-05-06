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
  searchTerm : FormControl = new FormControl();
  userName:string;
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
    this.userForm = new FormGroup({
      searchTerm: new FormControl()
   });
    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term.length>3) {
          this.userList.getUsersList(term).subscribe(data=>{
            this.userList1=data.items;
            console.log(this.userList1);
      })
    }})
}
}
