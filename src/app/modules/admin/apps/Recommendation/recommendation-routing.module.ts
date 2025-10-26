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
       breadCrum:'RecommendationList'
   }
},
{
    path     : 'recommendationlist',
    component: RecommendationlistComponent,
    data:{
       breadCrum:'RecommendationList'
   }
},
{
    path     : 'addrecommendation/:bookType/:recommendationType',
    component: AddrecommendationComponent,
    data:{
       breadCrum:'Add Recommendation'
   }
},
];

@NgModule({
  imports: [RouterModule.forChild(RecommendationRoutes)],
  exports: [RouterModule]
})
export class RecommendationRoutingModule { }
