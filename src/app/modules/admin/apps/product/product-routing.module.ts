import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddfreebookComponent } from './addfreebook/addfreebook.component';
import { AddretailbookComponent } from './addretailbook/addretailbook.component';
import { AudiobookDetailsComponent } from './audiobook-details/audiobook-details.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FreebooklistComponent } from './freebooklist/freebooklist.component';
import { ProductCategoryComponent } from './Master/product-category/product-category.component';
import { PrintbookDetailsComponent } from './printbook-details/printbook-details.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { MassuploadComponent } from './massupload/massupload.component';
import { ReadEbookComponent } from './read-ebook/read-ebook.component';
import { AddPrintBookComponent } from './add-print-book/add-print-book.component';
import { EditPrintComponent } from './edit-print/edit-print.component';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { MagazinesComponent } from './Master/magazines/magazines.component';
import { MasterComponent } from './Master/master.component';
import { BannersComponent } from './Master/banners/banners.component';
import { BlockedReasonsComponent } from './Master/blocked-reasons/blocked-reasons.component';

const routesProduct: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'productlist',
    data: {
      breadCrum: 'Magazine list'
    }
  },
  {
    path: 'productlist',
    component: ProductlistComponent,
    data: {
      breadCrum: 'Magazine list'
    }
  },
  {
    path: 'addPrintBook',
    component: AddPrintBookComponent,
    data: {
      breadCrum: 'Add magazine'
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
        path: 'magazines',
        component: MagazinesComponent,
        data: {
          breadCrum: 'Magazines',
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
        path: 'banners',
        component: BannersComponent,
        data: {
          breadCrum: 'Banners'
        }
      },
      {
          path     : 'blocked-reasons',
          component: BlockedReasonsComponent,
          data:{
            breadCrum:'Block Reason'
        }
      
      },
    ]
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
      breadCrum: 'Magazine edit'
    }
  },
  {
    path: 'printdetail',
    component: PrintbookDetailsComponent,
    data: {
      breadCrum: 'Magazine Detail'
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
