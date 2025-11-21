import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { CustomerRoutingModule } from '../Customers/customer-routing.module';
import { SharedModule } from 'primeng/api';
import { ProductlistComponent } from './productlist/productlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCategoryComponent } from './Master/product-category/product-category.component';
import { MasterComponent } from './Master/master.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { BookDetailsComponent } from './book-details/book-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import {RatingModule} from 'primeng/rating';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { ProductService } from './product.service';
import { PrintbookDetailsComponent } from './printbook-details/printbook-details.component';
import { AudiobookDetailsComponent } from './audiobook-details/audiobook-details.component';
import {ToastModule} from 'primeng/toast';
import { FreebooklistComponent } from './freebooklist/freebooklist.component';
import { AddfreebookComponent } from './addfreebook/addfreebook.component';
import { AddretailbookComponent } from './addretailbook/addretailbook.component';
import { CommonsModule } from 'app/shared/commons.module';
import { PaginatorModule } from 'primeng/paginator';
import { MassuploadComponent } from './massupload/massupload.component';
import { ReadEbookComponent } from './read-ebook/read-ebook.component';
import { AddPrintBookComponent } from './add-print-book/add-print-book.component';
import { EditPrintComponent } from './edit-print/edit-print.component';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { MagazinesComponent } from './Master/magazines/magazines.component';
import { BannersComponent } from './Master/banners/banners.component';
import { BlockedReasonsComponent } from './Master/blocked-reasons/blocked-reasons.component';
import { A11yModule } from "@angular/cdk/a11y";

@NgModule({
  declarations: [
   ProductlistComponent,
   ProductCategoryComponent,
   MasterComponent,
   BookDetailsComponent,
   PrintbookDetailsComponent,
   AudiobookDetailsComponent,
   FreebooklistComponent,
   AddfreebookComponent,
   AddretailbookComponent,
   MassuploadComponent,
   ReadEbookComponent,
   AddPrintBookComponent,
   EditPrintComponent,
   AudioUploadComponent,
   MagazinesComponent,
   BannersComponent,
   BlockedReasonsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    MatTabsModule,
    RatingModule,
    AutoCompleteModule,
    ToastModule,
    CommonsModule,
    PaginatorModule,
    A11yModule
],
  providers: [ProductService],
})
export class ProductModule { }
