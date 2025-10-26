import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubcriptionlistComponent } from './subcriptionlist/subcriptionlist.component';
import { SharedModule } from 'app/shared/shared.module'; 
import {CheckboxModule} from 'primeng/checkbox';
@NgModule({
  declarations: [
    SubcriptionlistComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
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
    SharedModule,
    CalendarModule,
    ScrollPanelModule,
    ConfirmDialogModule,
    MultiSelectModule,
    TabViewModule,
    DividerModule,
    ToastModule,
    CheckboxModule
  ]
})
export class SubscriptionModule { }
