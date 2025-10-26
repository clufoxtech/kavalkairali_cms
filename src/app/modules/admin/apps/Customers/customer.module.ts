import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerlistComponent } from './customerlist/customerlist.component';

import { SharedModule } from 'app/shared/shared.module';

import { BlockedReasonsComponent } from './blocked-reasons/blocked-reasons.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

import { EditcustomerComponent } from './editcustomer/editcustomer.component';
import { CommonsModule } from 'app/shared/commons.module';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { MessageService } from 'primeng/api';
import { AddbookaccessComponent } from './addbookaccess/addbookaccess.component';
import { BookaccesspageComponent } from './bookaccesspage/bookaccesspage.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
@NgModule({
  providers:[
    MessageService
  ],
  declarations: [
    CustomerlistComponent,
    BlockedReasonsComponent,
    CustomerDetailsComponent,
    EditcustomerComponent,
    AddcustomerComponent,
    AddbookaccessComponent,
    BookaccesspageComponent,
    OrderDetailsComponent  
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    CommonsModule
  ]
})
export class CustomerModule { }
