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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { AddGalleryComponent } from './add-gallery/add-gallery.component';
import { PanelModule } from 'primeng/panel';
import { A11yModule } from "@angular/cdk/a11y";
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    GalleryComponent,
    AddGalleryComponent,
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
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
    PanelModule,
    A11yModule,
    DropdownModule
]
})
export class GalleryModule { }
