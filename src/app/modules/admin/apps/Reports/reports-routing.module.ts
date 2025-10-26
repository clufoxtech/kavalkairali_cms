import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';

const ReportRoutes: Routes = [
  {
    path      : '',
    pathMatch : 'full',
    redirectTo: 'reportlist'
},
{
    path     : 'reportlist',
    component: ReportListComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(ReportRoutes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
