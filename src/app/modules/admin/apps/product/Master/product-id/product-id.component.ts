import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { ProductId } from '../../productModel/productid';
import { searchlist } from '../../productModel/searchList';
import { forEach } from 'lodash';

@Component({
  providers: [ConfirmationService, MessageService],
  selector: 'app-product-id',
  templateUrl: './product-id.component.html',
  styleUrls: ['./product-id.component.scss']
})
export class ProductIdComponent implements OnInit {

  @ViewChild('op', { static: true }) op: OverlayPanel;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  display: boolean = false;
  editdisplay: boolean = false;
  productIds: any;
  index: any;
  public productId: Array<ProductId>;
  public searchproductId: Array<ProductId>;
  public product: ProductId;
  public addDetails: ProductId;
  public editDetails: ProductId;
  editBookTypeValue: string;
  editBookValue: string;
  editAppleIdValue: string;
  editGoogleIdValue: string;
  editiTunePriceValue: string;
  addForm!: FormGroup;
  editForm!: FormGroup;
  books: any;
  perPage = 10;
  page = 0;
  totalRecords = 0;
  bookType: { name: string; code: string }[];
  searchDetails: any;
  searchBook: any;
  bookTypeSelected: string;
  editBookName: any;
  constructor(public formBuilder: FormBuilder,
    private messageService: MessageService,
    public productIdservice: ProductService,
    private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.index = 0;
    this.bookTypeSelected='PRINT';
    this.addForm = this.formBuilder.group({
      book: ['', [Validators.required]],
      appleId: ['', [Validators.required]],
      bookType: ['', [Validators.required]],
      ituneprice:['',[Validators.required]],
      filterValue: ['',]
    });
    this.editForm = this.formBuilder.group({
      editAppleId: ['', [Validators.required]],
      editituneprice: ['', [Validators.required]],
    });
    this.bookType = [
      { name: 'select', code: '' },
      { name: 'EBOOK', code: 'EBOOK' },
      { name: 'PRINT', code: 'PRINT' },
      { name: 'AUDIO', code: 'AUDIO' }
    ];
    this.GetProductIds();
    this.product = new ProductId();
  }
  GetProductIds() {
     this.productIdservice.getProductIds(this.bookTypeSelected,this.page,this.perPage).subscribe((response)=>{
//if(response._embedded.productIds.length>0){
  console.log(response);
        this.productId= new Array<ProductId>();
        this.productId=response?.content;
        this.totalRecords=response?.totalElements;
        console.log(this.productId);
     // }
       });
  }
  handleChange(e) {
    this.index = e.index;
    console.log(this.index);
   this.getBookType();
   this.GetProductIds();
}
  NewProductId() {
    this.display = true;
  }

  show(event, product) {
    this.product = product;
    this.op.show(event);
  }
  Cancel() {
    this.display = false;

    this.addForm.reset();
  }
  LazyLoadProductId(event) {
    this.page = event.first / event.rows;
    this.perPage = event.rows;
     if(  this.searchDetails?.productIdType){
       this.SearchProductId().then(() => {
         this.productId= new Array<ProductId>();
        this.productId=this.searchproductId;
       });
     }
     else{
       this.GetProductIds();
     }

  }
  async applyGlobalFilter(event) {
    console.log(event.target.value);
    this.searchDetails = new searchlist();
    this.searchDetails.title = event.target.value;
    if (this.searchDetails.title) {
      this.searchDetails.bookType = this.getBookType();
      this.searchDetails.bookStatus = 'PUBLISHED';
      this.SearchBook().then(() => {
        let results= new Array<any>();
        //this.productId= this.searchBook.productId;
        forEach(this.searchBook, (item) => {
          results.push(
          item.productId
        );
      });
        //console.log(this.searchBook);
        console.log(results);
        this.productId = results;
        this.totalRecords = this.productId.length;
      });
    }
    else {
      this.GetPrintBooks();
      console.log(this.productId);
    }
  }
  getBookType(): any {
    if(this.index===0)
      {
     this.bookTypeSelected='EBOOK';
     }
     else if(this.index===1){
       this.bookTypeSelected='PRINT';
     }
     else{
       this.bookTypeSelected='AUDIO';
     }
     return this.bookTypeSelected;
  }
  async searchBookControl() {
    console.log(this.addForm.controls['filterValue'].value);
    this.searchDetails = new searchlist();
    this.searchDetails.title = this.addForm.controls['filterValue'].value;
    if (this.searchDetails.title) {
      this.searchDetails.bookType = this.addForm.controls['bookType'].value;
      this.searchDetails.bookStatus = 'PUBLISHED';
      await this.SearchBook().then(() => {
        this.books = new Array<any>();
        this.books = this.searchBook;
        console.log(this.books);
      });
    }
    else {
      this.GetPrintBooks();
      console.log(this.books);
    }
  }
  GetPrintBooks() {
    this.productIdservice.getPrintBook('PUBLISHED', this.page, this.perPage).subscribe((response) => {
      if (response.content.length > 0) {
        this.books = new Array<any>();
        this.books = response.content;
      }
    });
  }
  async SearchBook(): Promise<any> {
    console.log(this.searchDetails);
    return new Promise<any[]>((resolve, reject) => {
      this.productIdservice.searchBook(0, 10, this.searchDetails).subscribe({
        next: (response) => {
          this.searchBook = new Array<any>();
          this.searchBook = response?.content;
          resolve(this.searchBook);
        },
      });
    });
  }
  SearchProductId(): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {

    });
  }
  AddProductId() {
    const type = this.addForm.controls['bookType'].value;
    console.log(this.addForm.controls['book']);
    this.addDetails= new ProductId();
    this.addDetails.bookId = this.addForm.controls['book'].value.id;
    if (type === 'PRINT') {
      this.addDetails.printAppleId = this.addForm.controls['appleId'].value;
      this.addDetails.printiTunePrice = this.addForm.controls['ituneprice'].value;
    }
    if (type === 'AUDIO') {
      this.addDetails.audioAppleId = this.addForm.controls['appleId'].value;
      this.addDetails.audioiTunePrice = this.addForm.controls['ituneprice'].value;
    }
    if (type === 'EBOOK') {
      this.addDetails.eBookAppleId = this.addForm.controls['appleId'].value;
      this.addDetails.ebookiTunePrice = this.addForm.controls['ituneprice'].value;
    }

    console.log(type);
    this.productIdservice.addUpdateProductId(this.addDetails).subscribe({
      next: (response) => {
        this.clear();
        this.GetProductIds();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
        this.GetProductIds();
      }
    });
  }
  clear() {
    this.display = false;
    this.addForm.reset();
  }
  EditCancel() {
    this.editdisplay = false;
    this.editForm.reset();
  }
  importProductId(event) {
    /*  this.pincodeservice.importPincodes(event.target.files[0],this.zoneid).subscribe({
       next: (response)=>{
         console.log(response);
         this.GetZonePincode();
       this.messageService.add({severity:'success', summary:response.status, detail:response.status});
   },
   error: (err) => {
     this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    }
     }); */
  }
  get getControl() {
    return this.addForm.controls;
  }
  get getEditControl() {
    return this.editForm.controls;
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
  Edit(product) {
    this.editdisplay = true;
    console.log(this.product);
    const type =this.getBookType();
    this.editBookName = product.bookTitle;
    if (type === 'PRINT') {
      this.editAppleIdValue = product.printAppleId;
      this.editiTunePriceValue =product.printApplePrice;
    }
    if (type === 'AUDIO') {
      this.editAppleIdValue = product.audioAppleId;
      this.editiTunePriceValue = product.audioApplePrice;
    }
    if (type === 'EBOOK') {
      this.editAppleIdValue = product.ebookAppleId;
      this.editiTunePriceValue = product.ebookApplePrice;
    }
    console.log(this.editAppleIdValue);
    console.log(this.editiTunePriceValue);
    console.log(this.editBookName);
  }
  EditProductId() {
    if (this.editForm.valid) {
      const type = this.getBookType();
      this.editDetails = new ProductId();
      this.editDetails.bookId = this.product.bookId;
      if (type === 'PRINT') {
        this.editDetails.printAppleId = this.editForm.controls['editAppleId'].value;
        this.editDetails.printiTunePrice = this.editForm.controls['editituneprice'].value;
      }
      if (type === 'AUDIO') {
        this.editDetails.audioAppleId = this.editForm.controls['editAppleId'].value;
        this.editDetails.audioiTunePrice = this.editForm.controls['editituneprice'].value;
      }
      if (type === 'EBOOK') {
        this.editDetails.eBookAppleId = this.editForm.controls['editAppleId'].value;
        this.editDetails.ebookiTunePrice = this.editForm.controls['editituneprice'].value;
      }
      console.log(this.editDetails);
      this.productIdservice.addUpdateProductId(this.editDetails).subscribe({
        next: (response) => {
          this.EditCancel();
          this.GetProductIds();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
          this.GetProductIds();
        }
      });
    }
    else {
      console.log(this.editForm);
      this.validateAllFields(this.editForm);
    }

  }

}
