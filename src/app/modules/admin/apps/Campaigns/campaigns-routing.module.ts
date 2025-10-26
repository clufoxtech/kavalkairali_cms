import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcampaignComponent } from './addcampaign/addcampaign.component';
import { CampaignlistComponent } from './campaignlist/campaignlist.component';
import { CouponlistComponent } from './couponlist/couponlist.component';
import { ComboOfferComponent } from './combo-offer/combo-offer.component';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { Breadcrumb } from 'primeng/breadcrumb';

const CampaignRoutes: Routes = [
  {
    path      : '',
    pathMatch : 'full',
    redirectTo: 'campaignlist',
    data:{
        breadCrum:'Offer list'
    }
},
{
    path     : 'campaignlist',
    component: CampaignlistComponent,
    data:{
        breadCrum:'Offer list'
    }
},
{
    path     : 'addcampaign',
    component: AddcampaignComponent,
    data:{
        breadCrum:'Add Campaign'
    }
},
{
    path     : 'couponlist',
    component: CouponlistComponent,
    data:{
        breadCrum:'Coupon List',
    }
},
{
    path     : 'comboOffer',
    component: ComboOfferComponent,
    data:{
        breadCrum:'Combo offer'
    }
},
{
    path:'campaign-detail',
    component:CampaignDetailComponent,
    data:{
        breadCrum: 'campaign-detail'
    }
}
];

@NgModule({
  imports: [RouterModule.forChild(CampaignRoutes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
