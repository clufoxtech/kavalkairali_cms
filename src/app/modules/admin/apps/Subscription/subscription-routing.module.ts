import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubcriptionlistComponent } from './subcriptionlist/subcriptionlist.component';

const routes: Routes = [
  {
    path      : '',
    pathMatch : 'full',
    redirectTo: 'subscriptionlist',
    data:{
      breadCrum:'SubscriptionList'
  }
},
{
    path     : 'subscriptionlist',
    component: SubcriptionlistComponent,
    data:{
      breadCrum:'SubscriptionList'
  }
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
