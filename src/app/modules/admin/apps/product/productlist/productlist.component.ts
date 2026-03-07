import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { CustomerDetails } from '../../Customers/CustomerModels/Customerdetails';
import { FilterModel } from '../../Customers/CustomerModels/dropdownfilter';
import { FormControl } from '@angular/forms';
import { ProductService } from '../product.service';
import { BookDetails } from '../productModel/bookdetails';
import { searchlist } from '../productModel/searchList';
import { environment } from 'environments/environment';
interface PaginationState {
  page: number;
  perPage: number;
}
@Component({
  providers: [ConfirmationService, MessageService],
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {
  @ViewChild('om', { static: true }) om: OverlayPanel;
  @ViewChild('oep', { static: true }) oep: OverlayPanel;
  @ViewChild('opp', { static: true }) opp: OverlayPanel;
  @ViewChild('oap', { static: true }) oap: OverlayPanel;
  @ViewChild('oad', { static: true }) oad: OverlayPanel;
  @ViewChild('opd', { static: true }) opd: OverlayPanel;
  @ViewChild('oeb', { static: true }) oeb: OverlayPanel;
  @ViewChild('oed', { static: true }) oed: OverlayPanel;
  @ViewChild('opb', { static: true }) opb: OverlayPanel;
  @ViewChild('opa', { static: true }) opa: OverlayPanel;
  @ViewChild('oab', { static: true }) oab: OverlayPanel;
  @ViewChild('oea', { static: true }) oea: OverlayPanel;
  @ViewChild('oaa', { static: true }) oaa: OverlayPanel;
  @ViewChild('stockPanel', { static: true }) stockPanel: OverlayPanel;
  //searchInputControl: UntypedFormControl = new UntypedFormControl();
  public data = [];
  public customer: boolean = false;
  public edit: boolean = false;
  public blockreason: boolean = false;
  public bookdetails: BookDetails;
  public blockedcustomer: CustomerDetails;
  representatives: FilterModel[];
  public ebookpublished: Array<any>;
  public ebookdraft: Array<any>;
  public ebookblocked: Array<any>;
  public ebookarchived: Array<any>;
  public printpublished: Array<any>;
  public printdraft: Array<any>;
  public printblocked: Array<any>;
  public printarchived: Array<any>;
  public audiopublished: Array<any>;
  public audiodraft: Array<any>;
  public audioblocked: Array<any>;
  public audioarchived: Array<any>;
  public index: number = 0;
  public statusIndex: number = 0;
  public publish: boolean = false;
  cities: FilterModel[];
  public selectedValue: string;
  public Schedule: boolean = false;
  public publishingBook: BookDetails;
  public isOutOfStock: boolean = false;
  loading: boolean;
  @ViewChild('dt1') table: Table;
  @ViewChild('dt5') table5: Table;
  PublishForm!: FormGroup;
  addFile!: FormGroup;
  perPage: number = 10;
  page: number = 0;
  totalRecords: number = 0;
  searchBook: Array<any>;
  searchDetails: searchlist;
  searchInputControl = new FormControl('');
  paginationStates: PaginationState[] = [];
  tabindex: any;
  stockDisplay: boolean;
  currentTab: string;
  currentStatus: string;
  stockValue: any;
  uploadImage: boolean;
  selectedFiles: any;
  imagePath: any;
  url: string | ArrayBuffer;
  uploadFile: boolean;
  fileUrl: null;
  searchMagazine: any;
  totalRecordsArchived: number;
  constructor(private messageService: MessageService, public formBuilder: FormBuilder, private router: Router, private confirmationService: ConfirmationService, public productservice: ProductService) { }

  ngOnInit(): void {
    // this.index=0;
    // this.statusIndex=0;
    this.GetOnInitFunction();
    this.PublishForm = this.formBuilder.group({
      cover: ['', []],
    });
    this.addFile = this.formBuilder.group({
      fileupload: ['', []],
    });
    const savedTabIndex = localStorage.getItem('selectedTabIndex');
    const savedTabStatusIndex = localStorage.getItem('selectedTabStatusIndex');
    localStorage.removeItem('selectedTabIndex');
    localStorage.removeItem('selectedTabStatusIndex');

    if (savedTabIndex) {
      this.index = +savedTabIndex; // Convert to a number
    } else {
      this.index = 0; // Set a default tab index
    }
    if (savedTabStatusIndex) {
      this.statusIndex = +savedTabStatusIndex; // Convert to a number
    } else {
      this.statusIndex = 0; // Set a default tab index
    }
    // Listen for route changes and save the selected tab index
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        localStorage.setItem('selectedTabIndex', this.index.toString());
        localStorage.setItem('selectedTabStatusIndex', this.statusIndex.toString());
      }
    });
  }
  GetOnInitFunction() {
    this.GetPrintBookPublishList();
  }

  editCancel() {
    this.stockDisplay = false;
  }
  LazyLoadPrintPublish(event) {
    this.page = event.first / event.rows;
    this.perPage = event.rows;
    if (this.searchDetails?.title) {
      this.SearchBook().then(() => {
        this.printpublished = new Array<any>();
        this.printpublished = this.searchBook;
      });
    }
    else {
      this.GetPrintBookPublishList();
    }

  }
  LazyLoadPrintDraft(event) {
    this.page = event.first / event.rows;
    this.perPage = event.rows;
    console.log(this.searchDetails?.title);
    if (this.searchDetails?.title) {
      this.SearchBook().then(() => {
        this.printdraft = new Array<any>();
        this.printdraft = this.searchBook;
      });
    }
    else {
      this.GetPrintDraft('DRAFT');
    }

  }
  LazyLoadPrintArchive(event) {
    this.page = event.first / event.rows;
    this.perPage = event.rows;
    if (this.searchDetails?.title) {
      this.SearchBook().then(() => {
        this.printarchived = new Array<any>();
        this.printarchived = this.printarchived;
      });
    }
    else {
      this.GetPrintArchived('ARCHIVED');
    }

  }
  updatePaginationAfterSearch(tabindex) {
    const paginationState = this.paginationStates[tabindex];
    const totalSearchResults = this.searchBook.length;
    const totalPages = Math.ceil(totalSearchResults / paginationState.perPage);

    // Ensure current page remains within valid range
    if (paginationState.page >= totalPages) {
      paginationState.page = totalPages - 1;
    }

    // Update paginator and display correct results

    this.tabindex.paginator.changePage(paginationState.page);
  }
  GetPrintBookPublishList() {
    this.productservice.getMagazineList().subscribe((response) => {
      console.log(response);  
      //if(response.content.length>0){
      this.printpublished = new Array<any>();
      this.printpublished = response._embedded.magazineEditions.filter(book => book.status === 'ACTIVE');
      this.totalRecords = this.printpublished.length;
      this.printarchived= response._embedded.magazineEditions.filter(book => book.status === 'ARCHIVED');
      this.totalRecordsArchived=this.printarchived.length;
      this.searchMagazine = response._embedded.magazineEditions
      ;
console.log(this.printpublished);
      //}
    });
  }
  GetPrintDraft(status: string) {
    this.productservice.getMagazines().subscribe((response) => {
      // if(response.content.length>0){
      this.printdraft = new Array<any>();
      this.printdraft = response.magazines;

      //}
    });
  }
  GetPrintArchived(status: string) {
    this.productservice.getMagazines().subscribe((response) => {
      //if(response.content.length>0){
      this.printarchived = new Array<any>();
      this.printarchived = response.magazines;

      //}
    });
  }
  showebookPublish(event, product) {
    this.bookdetails = product;
    this.oep.show(event);
  }
  showprintbookPublish(event, product) {
    this.bookdetails = product;
    this.opp.show(event);
  }
  showprintbookDraft(event, product) {
    this.bookdetails = product;
    this.opd.show(event);
  }
  showPrintArchive(event, product) {
    this.bookdetails = product;
    this.opa.show(event);
  }
  Delete(bookdetails) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this book?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productservice.deleteMagazineList(bookdetails.id).subscribe({
          next: (response) => {
            this.GetOnInitFunction();
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
          }
        });
      },
      reject: () => {
        //Actual logic to perform a confirmation
      }
    });
  }
  exportExcel() {
   this.GetIndex();
    const url = 'https://apps.dcbooks.com/books/download?bookStatus='+this.currentStatus+'&bookType='+this.currentTab;
    console.log(url);
window.open(url,'_blank');

  }

  get getControl() {
    return this.PublishForm.controls;
  }
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
  va;
  ShowBook(product) {
    this.bookdetails = product;
    this.productservice.setBookData(product);
    this.router.navigate(['apps/product/printdetail', product]);
  }
  EditPrintBook(product) {
    this.bookdetails = product;
    this.opp.hide();
    this.router.navigate(['apps/product/printedit', this.bookdetails]);

  }
  GoToMassUploadPage() {
    this.router.navigate(['apps/product/massupload']);
  }

  ArchiveBook(product) {
    this.confirmationService.confirm({
      message: 'Do you want to archive this book?',
      header: 'Archive Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productservice.changeStatus(product.id, 'ARCHIVED').subscribe({
          next: (response) => {
            this.GetOnInitFunction();
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
          }

        });
      },
      reject: () => {
        //Actual logic to perform a confirmation
      }
    });
  }

  More(event) {
    this.om.show(event);
  }
  importList(event) {
      this.productservice.importBook('PRINT', event.target.files[0]).subscribe({
        next: (response) => {
          this.GetPrintBookPublishList();
          this.messageService.add({ severity: 'success', summary: response.status, detail: response.status });
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
        }
      }
      );
  }
  handleChange(e) {
    this.index = e.index;
    this.searchInputControl.patchValue('');
    this.searchDetails = new searchlist();
    this.GetOnInitFunction();
  }
  handleChangeStatus(e) {
    this.statusIndex = e.index;
    this.searchInputControl.patchValue('');
    this.searchDetails = new searchlist();
    this.GetOnInitFunction();

  }
  applyGlobalFilter(event) {
    this.searchDetails = new searchlist();
    this.searchDetails.title = event.target.value;
    if (this.searchDetails.title) {
      if (this.statusIndex == 0) {
      this.printpublished=this.searchMagazine.filter(book => book.name.toLowerCase().includes(this.searchDetails.title.toLowerCase())
      && book.status ==='ACTIVE');
      }
      else if (this.statusIndex == 1) {
          this.printarchived = this.searchMagazine.filter(book => book.name.toLowerCase().includes(this.searchDetails.title.toLowerCase())
      && book.status ==='ARCHIVED');
      }
    }
    else {
      this.GetOnInitFunction();
    }

  }

  SearchBook(): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
      this.productservice.searchBook(this.page, this.perPage, this.searchDetails).subscribe({
        next: (response) => {
          this.searchBook = response?.content;
          resolve(this.searchBook);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
        }
      });
    });
  }
  AddProduct() {
      this.router.navigate(['apps/product/addPrintBook']);
  }
  SchedulePublish(value) {
    if (value == 'Schedule') {
      this.Schedule = true;
      this.PublishForm.controls.date.setValidators([Validators.required]);
      this.PublishForm.controls.time.setValidators([Validators.required]);
    }
    else {
      this.Schedule = false;

    }

  }
  MoveToDraft()
  {
    this.confirmationService.confirm({
      message: 'Do you want to move this book to draft?',
      header: 'Draft Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productservice.changeStatus(this.bookdetails.id,'DRAFT').subscribe({
          next: (response) => {
            this.GetOnInitFunction();
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
          }
        });
},
      reject: () => {
        //Actual logic to perform a confirmation
      }
    });
  }


  clear() {
    this.searchInputControl.setValue('');
    this.searchDetails = new searchlist();
    this.GetOnInitFunction();
  }
  UploadFile(product){
    this.opp.hide();
    this.addFile.reset();
    this.fileUrl=null;
    this.bookdetails = product;
    console.log(product);
    this.uploadFile=true;
  }
  addFileMagazine(){
    if(this.selectedFiles?.length>0 ){
        this.productservice.addFile( this.selectedFiles[0]).subscribe({
          next: (response)=>{
            this.bookdetails.fileID=response.publicId;
            this.addFileToMagazine();
          },
          error: (err) => {
          this.bookdetails.fileID=null;
          this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
          }
      });
      }
  }
  addFileToMagazine() {
    this.productservice.updateMagazineFile(this.bookdetails.id,this.bookdetails.fileID).subscribe({
      next: (response)=>{
        this.messageService.add({severity:'success', summary:'Success', detail:'File added successfully'});
        this.uploadFile=false;
        this.GetOnInitFunction();
        this.addFile.reset();
      },
      error: (err) => {
       this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
      }
    });
  }
  UploadCoverImage(product){
    this.opp.hide();
    this.PublishForm.reset();
    this.url=null;
    this.bookdetails = product;
    console.log(product);
    if(product.coverId!=null && product.coverId!=undefined){
    this.url=environment.baseUrl+'/uploads/image/'+product.coverId;
  }
    console.log(this.bookdetails);
    this.uploadImage=true;
  }
addCoverImage(){
if(this.selectedFiles?.length>0 ){
    this.productservice.addImage( this.selectedFiles[0]).subscribe({
      next: (response)=>{
        this.bookdetails.coverId=response.publicId;
        this.addCover(); 
     },
     error: (err) => {
      this.bookdetails.coverId=null;
      this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
     }
  })
  }
}
addCover(){
  this.productservice.updateMagazineCover(this.bookdetails.id,this.bookdetails.coverId).subscribe({
    next: (response)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Cover image added successfully'});
      this.uploadImage=false;
      this.GetOnInitFunction();
      this.PublishForm.reset();
    },
    error: (err) => {
     this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    }
  })
}
onFileChanged(event) {
  this.selectedFiles = event.target.files;
  if (this.selectedFiles.length === 0)
      return;

  const mimeType = this.selectedFiles[0].type;
  if (mimeType.match(/image\/*/) == null) {
      //this.message = "Only images are supported.";
      return;
  }

  const reader = new FileReader();
  this.imagePath = this.selectedFiles;
  reader.readAsDataURL(this.selectedFiles[0]); 
  reader.onload = (_event) => { 
      this.url = reader.result; 
  }
}

  GetIndex(){
    if (this.index == 0 && this.statusIndex == 0) {
      this.currentTab= 'PRINT';
this.currentStatus='PUBLISHED';
      }
    else if (this.index == 0 && this.statusIndex == 1) {
      this.currentTab= 'PRINT';
this.currentStatus='DRAFT';
    }
    else if (this.index == 0 && this.statusIndex == 2) {
      this.currentTab= 'PRINT';
this.currentStatus='BLOCKED';
    }
    else if (this.index == 0 && this.statusIndex == 3) {
      this.currentTab= 'PRINT';
this.currentStatus='ARCHIVED';
    }
    else if (this.index == 1 && this.statusIndex == 0) {
      this.currentTab= 'EBOOK';
this.currentStatus='PUBLISHED';
    }
    else if (this.index == 1 && this.statusIndex == 1) {
      this.currentTab= 'EBOOK';
this.currentStatus='DRAFT';
    }
    else if (this.index == 1 && this.statusIndex == 2) {
      this.currentTab= 'EBOOK';
this.currentStatus='BLOCKED';
    }
    else if (this.index == 1 && this.statusIndex == 3) {
      this.currentTab= 'EBOOK';
this.currentStatus='ARCHIVED';
    }
    else if (this.index == 2 && this.statusIndex == 0) {
      this.currentTab= 'AUDIO';
this.currentStatus='PUBLISHED';
    }
    else if (this.index == 2 && this.statusIndex == 1) {
      this.currentTab= 'AUDIO';
this.currentStatus='DRAFT';
    }
    else if (this.index == 2 && this.statusIndex == 2) {
      this.currentTab= 'AUDIO';
this.currentStatus='BLOCKED';
    }
    else if (this.index == 2 && this.statusIndex == 3) {
      this.currentTab= 'AUDIO';
this.currentStatus='ARCHIVED';
    }
  }

}
