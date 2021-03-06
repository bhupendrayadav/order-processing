import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ManagerComponent } from './manager/manager.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'manager',
        component: ManagerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
