import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddfreebookComponent } from './addfreebook/addfreebook.component';
import { AddretailbookComponent } from './addretailbook/addretailbook.component';
import { AudiobookDetailsComponent } from './audiobook-details/audiobook-details.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FreebooklistComponent } from './freebooklist/freebooklist.component';
import { AreaComponent } from './Master/area/area.component';
import { BindingtypeComponent } from './Master/bindingtype/bindingtype.component';
import { BookConditionComponent } from './Master/book-condition/book-condition.component';
import { CityComponent } from './Master/city/city.component';
import { ContributorsComponent } from './Master/contributors/contributors.component';
import { CountryComponent } from './Master/country/country.component';
import { ImprintComponent } from './Master/imprint/imprint.component';
import { LanguageComponent } from './Master/language/language.component';
import { LocationComponent } from './Master/location/location.component';
import { MasterComponent } from './Master/master.component';
import { PincodeComponent } from './Master/pincode/pincode.component';
import { ProductCategoryComponent } from './Master/product-category/product-category.component';
import { ProductSubcategoryComponent } from './Master/product-subcategory/product-subcategory.component';
import { PublisherComponent } from './Master/publisher/publisher.component';
import { StateComponent } from './Master/state/state.component';
import { PrintbookDetailsComponent } from './printbook-details/printbook-details.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { MassuploadComponent } from './massupload/massupload.component';
import { ReadEbookComponent } from './read-ebook/read-ebook.component';
import { BannerComponent } from './Master/banner/banner.component';
import { WarehouseComponent } from './Master/warehouse/warehouse.component';
import { ZoneComponent } from './Master/zone/zone.component';
import { RegionComponent } from './Master/region/region.component';
import { AddPrintBookComponent } from './add-print-book/add-print-book.component';
import { EditPrintComponent } from './edit-print/edit-print.component';
import { CourierTypeComponent } from './Master/courier-type/courier-type.component';
import { DeliveryPartnerComponent } from './Master/delivery-partner/delivery-partner.component';
import { PackingTypeComponent } from './Master/packing-type/packing-type.component';
import { PackingSizeComponent } from './Master/packing-size/packing-size.component';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { ZonePincodeComponent } from './Master/zone-pincode/zone-pincode.component';
import { WeightComponent } from './Master/weight/weight.component';
import { ShippingChargesComponent } from './Master/shipping-charges/shipping-charges.component';
import { ProductIdComponent } from './Master/product-id/product-id.component';
import { ShelfComponent } from './Master/shelf/shelf.component';
import { BookPositionComponent } from './Master/book-position/book-position.component';

const routesProduct: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'productlist',
    data: {
      breadCrum: 'ProductList'
    }
  },
  {
    path: 'productlist',
    component: ProductlistComponent,
    data: {
      breadCrum: 'ProductList'
    }
  },
  {
    path: 'addPrintBook',
    component: AddPrintBookComponent,
    data: {
      breadCrum: 'Add Print'
    }
  },
  {
    path: 'bookdetails',
    component: BookDetailsComponent,
    data: {
      breadCrum: 'EBook Details'
    }
  },
  {
    path: 'readebook',
    component: ReadEbookComponent,
    data: {
      breadCrum: 'View Book'
    }
  },
  {
    path: 'Master',
    data: {
      breadCrum: 'Master'
    },
    children: [
      {
        path: '',
        component: MasterComponent,
      },
      {
        path: 'contributor',
        component: ContributorsComponent,
        data: {
          breadCrum: 'Contributor',
        }
      },
      {
        path: 'publisher',
        component: PublisherComponent,
        data: {
          breadCrum: 'Publisher'
        }
      },
      {
        path: 'product-category',
        component: ProductCategoryComponent,
        data: {
          breadCrum: 'Category'
        }
      },
      {
        path: 'product-subcategory',
        component: ProductSubcategoryComponent,
        data: {
          breadCrum: 'Subcategory'
        }
      },
      {
        path: 'imprint',
        component: ImprintComponent,
        data: {
          breadCrum: 'Imprint'
        }
      },
      {
        path: 'book-condition',
        component: BookConditionComponent,
        data: {
          breadCrum: 'BookCondition'
        }
      },
      {
        path: 'location',
        component: LocationComponent,
        data: {
          breadCrum: 'Location'
        },
      },
      {
        path: 'language',
        component: LanguageComponent,
        data: {
          breadCrum: 'Language'
        }
      },
      {
        path: 'bindingType',
        component: BindingtypeComponent,
        data: {
          breadCrum: 'Bindingtype'
        }
      },
      {
        path: 'banner',
        component: BannerComponent,
        data: {
          breadCrum: 'Home screen banner'
        }
      },
      {
        path: 'warehouse',
        component: WarehouseComponent,
        data: {
          breadCrum: ' Warehouse'
        }
      },
      {
        path: 'zone',
        component: ZoneComponent,
        data: {
          breadCrum: 'Zone'
        }
      },
      {
        path: 'region',
        component: RegionComponent,
        data: {
          breadCrum: 'Region'
        }
      },
      {
        path: 'courier',
        component: CourierTypeComponent,
        data: {
          breadCrum: 'Courier type'
        }
      },
      {
        path: 'deliveryPartner',
        component: DeliveryPartnerComponent,
        data: {
          breadCrum: 'Delivery partner'
        }
      },
      {
        path: 'packingType',
        component: PackingTypeComponent,
        data: {
          breadCrum: 'Packing Type'
        }
      },
      {
        path: 'packingSize',
        component: PackingSizeComponent,
        data: {
          breadCrum: 'Packing Size'
        }
      },
      {
        path: 'weight',
        component: WeightComponent,
        data: {
          breadCrum: 'Weight'
        }
      },
      {
        path: 'product-id',
        component: ProductIdComponent,
        data: {
          breadCrum: 'product id',
        }
      },
      {
        path: 'shelf',
        component: ShelfComponent,
        data: {
          breadCrum: 'shelf',
        }
      },
      {
        path: 'book-position',
        component: BookPositionComponent,
        data: {
          breadCrum: 'book position',
        }
      }
    ]
  },
  {
    path: 'Master/shipping-charges',
    component: ShippingChargesComponent,
  },
  {
    path: 'state',
    component: StateComponent,
    data: {
      breadCrum: 'State'
    }
  },
  {
    path: 'Master/country',
    component: CountryComponent,
    data: {
      breadCrum: 'Country'
    }
  },
  {
    path: 'Master/city',
    component: CityComponent,
    data: {
      breadCrum: 'City'
    }
  },
  {
    path: 'Master/area',
    component: AreaComponent,
    data: {
      breadCrum: 'Area'
    }
  },
  {
    path: 'Master/pincode',
    component: PincodeComponent,
    data: {
      breadCrum: 'Pincode'
    }
  },
  {
    path: 'Master/zone-pincode',
    component: ZonePincodeComponent
  },
  {
    path: 'audio-Upload',
    component: AudioUploadComponent,
    data: {
      breadCrum: 'Audio Upload'
    }
  },
  {
    path: 'printedit',
    component: EditPrintComponent,
    data: {
      breadCrum: 'Print Edit'
    }
  },
  {
    path: 'printdetail',
    component: PrintbookDetailsComponent,
    data: {
      breadCrum: 'Print Detail'
    }
  },
  {
    path: 'audiodetails',
    component: AudiobookDetailsComponent,
    data: {
      breadCrum: 'Audio Detail'
    }
  },
  {
    path: 'freebooklist',
    component: FreebooklistComponent,
    data: {
      breadCrum: 'FreeBook'
    }
  },
  {
    path: 'addfreebook',
    component: AddfreebookComponent,
    data: {
      breadCrum: 'Add FreeBook'
    }
  },
  {
    path: 'addretail',
    component: AddretailbookComponent,
    data: {
      breadCrum: 'Add Retail'
    }
  },
  {
    path: 'massupload',
    component: MassuploadComponent,
    data: {
      breadCrum: 'Mass Upload'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesProduct)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
