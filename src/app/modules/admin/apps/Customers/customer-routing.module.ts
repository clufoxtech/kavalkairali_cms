import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockedReasonsComponent } from './blocked-reasons/blocked-reasons.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { AddbookaccessComponent } from './addbookaccess/addbookaccess.component';
import { BookaccesspageComponent } from './bookaccesspage/bookaccesspage.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const  CustomerRoutes:Routes = [
  {
    path      : '',
    pathMatch : 'full',
    redirectTo: 'customerslist',
    data:{
      breadCrum:'CustomerList'
  }
},
{
    path     : 'customerslist',
    component: CustomerlistComponent,
    data:{
      breadCrum:'CustomerList'
  }
},
{
    path     : 'blockedreason',
    component: BlockedReasonsComponent,
    data:{
      breadCrum:'Block Reason'
  }

},
{
    path     : 'customerdetails',
    component: CustomerDetailsComponent,
    data:{
      breadCrum:'Customer Details'
  }

},
{
  path     : 'bookaccess',
  component: AddbookaccessComponent,
//   data:{
//     breadCrum:'Customer Details'
// }

},
{
  path     : 'bookaccesspage',
  component: BookaccesspageComponent,
//   data:{
//     breadCrum:'Customer Details'
// }

},
{
  path     : 'orderdetails',
  component: OrderDetailsComponent,
},
];
@NgModule({
  imports: [RouterModule.forChild(CustomerRoutes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
