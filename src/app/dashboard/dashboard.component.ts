import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  users = [
    {
      name: 'USER',
      id: 'user'
    },
    {
      name: 'MANAGER',
      id: 'manager'
    }
  ];

  selectedUser: string;

  constructor(private router: Router) {
    this.selectedUser = this.router.url.split('/')[2];
  }

  onChange(value: string) {
    this.router.navigate(['/dashboard', value]);
  }
}
