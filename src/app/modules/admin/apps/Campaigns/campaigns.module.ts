import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignlistComponent } from './campaignlist/campaignlist.component';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddcampaignComponent } from './addcampaign/addcampaign.component';
import { CouponlistComponent } from './couponlist/couponlist.component';
import {CheckboxModule} from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ComboOfferComponent } from './combo-offer/combo-offer.component';
import { PanelModule } from 'primeng/panel';
import { SharedModule } from 'primeng/api';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
@NgModule({
  declarations: [
    CampaignlistComponent,
    AddcampaignComponent,
    CouponlistComponent,
    ComboOfferComponent,
    CampaignDetailComponent
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    TableModule,
    OverlayPanelModule,
    SidebarModule,
    DialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    CalendarModule,
    ScrollPanelModule,
    ConfirmDialogModule,
    MultiSelectModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    ToastModule,
    CheckboxModule,
    DropdownModule,
    SharedModule,
    PanelModule
  ]
})
export class CampaignsModule { }
