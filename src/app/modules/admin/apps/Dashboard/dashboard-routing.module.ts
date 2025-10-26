import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

const dashboardRoutes: Routes = [
  {
    path      : '',
    pathMatch : 'full',
    redirectTo: 'dashboard-page'
},
{
    path     : 'dashboard-page',
    component: DashboardPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
