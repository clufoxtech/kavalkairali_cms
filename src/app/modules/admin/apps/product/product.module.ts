import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { RouterModule } from '@angular/router';
import { CustomerRoutingModule } from '../Customers/customer-routing.module';

import { SharedModule } from 'primeng/api';

import { ProductlistComponent } from './productlist/productlist.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContributorsComponent } from './Master/contributors/contributors.component';
import { PublisherComponent } from './Master/publisher/publisher.component';
import { ProductCategoryComponent } from './Master/product-category/product-category.component';
import { ProductSubcategoryComponent } from './Master/product-subcategory/product-subcategory.component';
import { ImprintComponent } from './Master/imprint/imprint.component';
import { BookConditionComponent } from './Master/book-condition/book-condition.component';
import { MasterComponent } from './Master/master.component';
import { LocationComponent } from './Master/location/location.component';
import { CountryComponent } from './Master/country/country.component';
import { StateComponent } from './Master/state/state.component';
import { AreaComponent } from './Master/area/area.component';
import { CityComponent } from './Master/city/city.component';
import { PincodeComponent } from './Master/pincode/pincode.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { BookDetailsComponent } from './book-details/book-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import {RatingModule} from 'primeng/rating';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { ProductService } from './product.service';
import { LanguageComponent } from './Master/language/language.component';
import { PrintbookDetailsComponent } from './printbook-details/printbook-details.component';
import { AudiobookDetailsComponent } from './audiobook-details/audiobook-details.component';
import {ToastModule} from 'primeng/toast';
import { FreebooklistComponent } from './freebooklist/freebooklist.component';
import { AddfreebookComponent } from './addfreebook/addfreebook.component';
import { AddretailbookComponent } from './addretailbook/addretailbook.component';
import { BindingtypeComponent } from './Master/bindingtype/bindingtype.component';
import { CommonsModule } from 'app/shared/commons.module';
import { PaginatorModule } from 'primeng/paginator';
import { MassuploadComponent } from './massupload/massupload.component';
import { ReadEbookComponent } from './read-ebook/read-ebook.component';
import { BannerComponent } from './Master/banner/banner.component';
import { WarehouseComponent } from './Master/warehouse/warehouse.component';
import { ZoneComponent } from './Master/zone/zone.component';
import { RegionComponent } from './Master/region/region.component';
import { AddPrintBookComponent } from './add-print-book/add-print-book.component';
import { EditPrintComponent } from './edit-print/edit-print.component';
import { PackingTypeComponent } from './Master/packing-type/packing-type.component';
import { PackingSizeComponent } from './Master/packing-size/packing-size.component';
import { CourierTypeComponent } from './Master/courier-type/courier-type.component';
import { DeliveryPartnerComponent } from './Master/delivery-partner/delivery-partner.component';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { ZonePincodeComponent } from './Master/zone-pincode/zone-pincode.component';
import { WeightComponent } from './Master/weight/weight.component';
import { ShippingChargesComponent } from './Master/shipping-charges/shipping-charges.component';
import { ProductIdComponent } from './Master/product-id/product-id.component';
import { ShelfComponent } from './Master/shelf/shelf.component';
import { BookPositionComponent } from './Master/book-position/book-position.component';
@NgModule({
  declarations: [
   ProductlistComponent,
   ContributorsComponent,
   PublisherComponent,
   ProductCategoryComponent,
   ProductSubcategoryComponent,
   ImprintComponent,
   BookConditionComponent,
   MasterComponent,
   LocationComponent,
   CountryComponent,
   StateComponent,
   AreaComponent,
   CityComponent,
   PincodeComponent,
   BookDetailsComponent,
   LanguageComponent,
   PrintbookDetailsComponent,
   AudiobookDetailsComponent,
   FreebooklistComponent,
   AddfreebookComponent,
   AddretailbookComponent,
   BindingtypeComponent,
   MassuploadComponent,
   ReadEbookComponent,
   BannerComponent,
   WarehouseComponent,
   ZoneComponent,
   RegionComponent,
   AddPrintBookComponent,
   EditPrintComponent,
   PackingTypeComponent,
   PackingSizeComponent,
   CourierTypeComponent,
   DeliveryPartnerComponent,
   AudioUploadComponent,
   ZonePincodeComponent,
   WeightComponent,
   ShippingChargesComponent,
   ProductIdComponent,
   ShelfComponent,
   BookPositionComponent
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
    PaginatorModule
  ],
  providers: [ProductService],
})
export class ProductModule { }
