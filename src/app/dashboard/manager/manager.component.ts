import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';

interface users {
  userId: number;
  userName: string;
}

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  search: FormControl = new FormControl();
  usersList: users[] = [];

  constructor(private dashboardService: UsersService) { }

  ngOnInit() {
    this.search.valueChanges.subscribe(
      term => {
        if (term.length > 3) {
          this.dashboardService.getUsersList(term).subscribe(data => {
            this.usersList = data.items;
          })
        }
      });
  }

}
