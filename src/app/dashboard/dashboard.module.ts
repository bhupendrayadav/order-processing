import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { ManagerComponent } from './manager/manager.component';
import { DashboardComponent } from './dashboard.component';
import { UserComponent } from './user/user.component';
import { ChartsModule } from '../charts/charts.module';


@NgModule({
  declarations: [DashboardComponent, UserComponent, ManagerComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    ChartsModule,
  ]
})
export class DashboardModule { }
