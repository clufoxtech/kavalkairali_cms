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
import { MultiSelectModule } from 'primeng/multiselect';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'app/shared/shared.module'; 
import { SupportComponent } from './support/support.component';
import { DropdownModule } from 'primeng/dropdown';
import { WebPagesComponent } from './web-pages/web-pages.component';
import { AddPolicyComponent } from './web-pages/add-policy/add-policy.component';
import { MessagesComponent } from './messages/messages.component';
@NgModule({
  declarations: [
    SupportComponent,
    WebPagesComponent,
    AddPolicyComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
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
    ToastModule,
    DropdownModule
  ]
})
export class SettingsModule { }
