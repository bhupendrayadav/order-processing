import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { ManagerComponent } from './manager/manager.component';
import { DashboardComponent } from './dashboard.component';
import { UserComponent } from './user/user.component';
import { ChartsModule } from '../charts/charts.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [DashboardComponent, UserComponent, ManagerComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    ChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule
  ]
})
export class DashboardModule { }
