import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './support/support.component';
import { WebPagesComponent } from './web-pages/web-pages.component';
import { AddPolicyComponent } from './web-pages/add-policy/add-policy.component';

const settingsroutes: Routes = [
  {
    path      : '',
    pathMatch : 'full',
    redirectTo: 'Support',
    data:{
      breadCrum:'Support'
  }
},
{
    path     : 'support',
    component: SupportComponent,
    data:{
      breadCrum:'Support'
  }
},
{
    path     : 'web-pages',
    component: WebPagesComponent,
    data:{
      breadCrum:'Web pages'
  }
}
,
{
    path     : 'add-policy',
    component: AddPolicyComponent,
    data:{
      breadCrum:'Add policy'
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(settingsroutes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
