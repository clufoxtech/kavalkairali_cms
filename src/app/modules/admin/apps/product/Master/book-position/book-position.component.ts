import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { BookPosition } from '../../productModel/bookPosition';
import { searchlist } from '../../productModel/searchList';
import { shelf } from '../../productModel/shelf';
import { filter } from 'lodash';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-book-position',
  templateUrl: './book-position.component.html',
  styleUrls: ['./book-position.component.scss']
})
export class BookPositionComponent implements OnInit {
searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  onlyCapitals: RegExp=/[A-Z]/;
  searchDetails: searchlist;
  searchBook: any;
  books: any;
  shelf: shelf[];
  shelfs: shelf[];
  editproduct: any;
  editBook: any;
  editShelfId: any;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public bookPositionservice: ProductService,private confirmationService: ConfirmationService) { }
public bookPosition: Array<BookPosition>;
public product: BookPosition;
public addDetails: BookPosition;
public editDetails: BookPosition;
display: boolean = false;
editdisplay: boolean = false;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new BookPosition();
  this.AddForm = this.formBuilder.group({
    addBook: ['', [Validators.required]],
    addShelfId: ['', [Validators.required]],
    filterValue: [''],

  });
  this.EditForm = this.formBuilder.group({
    editShelfId: ['', [Validators.required]],

  });
 this.GetBookposition();
 this.Getshelfs();
  }
  Getshelfs(){
    this.bookPositionservice.getShelves().subscribe((response)=>{
    if(response._embedded.shelves.length>0){
      this.shelfs= new Array<shelf>();
    this.shelfs=response._embedded.shelves;
    }
    console.log(this.shelfs);
  });
}
  GetBookposition(){
    this.bookPositionservice.getBookPosition().subscribe((response)=>{
      if(response._embedded.bookPositions.length>0){
        this.bookPosition= new Array<BookPosition>();
        this.bookPosition=response._embedded.bookPositions;
        console.log(this.bookPosition);
      }
       });
  }
  async applyGlobalFilter() {
      console.log(this.AddForm);
      this.searchDetails = new searchlist();
      this.searchDetails.title = this.AddForm.controls['filterValue'].value;
      if (this.searchDetails.title) {
        this.searchDetails.bookType = 'PRINT';
        this.searchDetails.bookStatus = 'PUBLISHED';
        await this.SearchBook().then(() => {
          this.books = new Array<any>();
          this.books = this.searchBook;
          console.log(this.books);
        });
      }
      else {
      }
    }

    async SearchBook(): Promise<any> {
      return new Promise<any[]>((resolve, reject) => {
        this.bookPositionservice.searchBook(0, 10, this.searchDetails).subscribe({
          next: (response) => {
            this.searchBook = response?.content;
            resolve(this.searchBook);
          },
        });
      });
    }
   GetBooks() {
      this.bookPositionservice.getPrintBook('PUBLISHED', 0, 15).subscribe((response) => {
        if (response.content.length > 0) {
          this.books = new Array<any>();
          this.books = response.content;
        }
      });
    }
  NewBookposition(){
    this.GetBooks();
    this.display=true;
  }
  clear(table: Table) {
    table.clear();
}
show(event,product){
  this.product=product;
  this.op.show(event);
}
Cancel(){
  this.display=false;
  this.AddForm.reset();
}
AddBookposition(){
  console.log(this.AddForm);
  if (this.AddForm.valid) {
    const book=this.AddForm.controls['addBook'].value;
    let bookName: any = {};
    if(book && book.links && book.links.length > 0) {
    bookName=book.links[0];
    console.log(bookName);
    }
    const shelfId=this.AddForm.controls['addShelfId'].value;
    console.log(shelfId);
    console.log(bookName);
  this.bookPositionservice.addBookPosition(bookName.href, shelfId).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetBookposition();
      this.Cancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetBookposition();
    this.Cancel();
   }
 });
    }
     else {
      this.validateAllFields(this.AddForm);
  }
}
get getControl(){
  return this.AddForm.controls;
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
get getEditControl(){
  return this.EditForm.controls;
}
Edit(product){
  this.GetBooks();
  this.editdisplay=true;
 this.editBook=product.bookName;
 this.editShelfId=product.shelfName;
  this.op.hide();
  console.log(this.editBook);
  console.log(this.editShelfId);
}
EditBookposition(){
  console.log(this.EditForm);
  if (this.EditForm.valid) {
    const shelfId=this.EditForm.controls['editShelfId'].value;
  this.bookPositionservice.editBookPosition(this.product.id, shelfId).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetBookposition();
      this.EditCancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetBookposition();
    this.EditCancel();
   }
 });
    }
     else {
      this.validateAllFields(this.EditForm);
  }
}
EditCancel(){
this.editdisplay=false;

}
Delete(bookPosition){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.bookPositionservice.deleteBookPosition(bookPosition.id).subscribe({
          next: (response)=>{
            this.GetBookposition();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetBookposition();
          }
        });
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });

}

}

