import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketThresholdComponent } from './market-threshold.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full'
  },
  {
    path: 'client',
    component: MarketThresholdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketThresholdRoutingModule { }
