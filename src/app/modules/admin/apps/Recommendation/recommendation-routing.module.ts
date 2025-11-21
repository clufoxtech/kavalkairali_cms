import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddrecommendationComponent } from './addrecommendation/addrecommendation.component';
import { RecommendationlistComponent } from './recommendationlist/recommendationlist.component';

const RecommendationRoutes: Routes = [
  {
    path      : '',
    pathMatch : 'full',
    redirectTo: 'recommendationlist',
    data:{
       breadCrum:'Home screen list'
   }
},
{
    path     : 'recommendationlist',
    component: RecommendationlistComponent,
    data:{
       breadCrum:'Home screen list'
   }
},
{
    path     : 'addrecommendation/:bookType/:recommendationType',
    component: AddrecommendationComponent,
    data:{
       breadCrum:'Add home screen'
   }
},
];

@NgModule({
  imports: [RouterModule.forChild(RecommendationRoutes)],
  exports: [RouterModule]
})
export class RecommendationRoutingModule { }
