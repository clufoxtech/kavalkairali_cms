import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { UserDetails } from '../../users/UserModels/UserDetailModel';
import { UserserviceService } from '../../users/userservice.service';
import { ProductService } from '../product.service';
import { BookDetails } from '../productModel/bookdetails';

@Component({
  providers: [ConfirmationService],
  selector: 'app-freebooklist',
  templateUrl: './freebooklist.component.html',
  styleUrls: ['./freebooklist.component.scss']
})
export class FreebooklistComponent implements OnInit {
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  public FreeEBookList: Array<BookDetails> = [];
  public FreeAudioList: Array<BookDetails> = [];
  public FreePrintList: Array<BookDetails> = [];
  public product: BookDetails;
  public BookDetail: BookDetails;
  msgs: Message[] = [];
  public status: string;
  public index: number;
  public data: any[];
  @ViewChild('op', { static: true }) op: OverlayPanel;
  @ViewChild('op', { static: true }) ele: ElementRef;
  @ViewChild('al', { static: true }) al: OverlayPanel;

  constructor(public productservice: ProductService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.index = 0;
    //this.data=[{'product':'Bhumiyude Avakashikal','version':'Audio','author':'Basheer','edition':2,'volume':1,'code':'HP4785','language':'Malayalam','mrp':'540 INR','revenue':'100 INR','royalty':20,'ramount':'42000 INR','payable':'32500 INR'}]
    this.GetFreeEBook();
    this.GetFreeAudio();
    this.GetFreePrint();
  }
  AddFreeBook() {
    this.router.navigate([`apps/product/addfreebook`]);
  }
  GetFreeEBook() {
    this.productservice.getFreeOrRetailBook('EBOOK', 'FREE').subscribe((response) => {
      this.FreeEBookList = new Array<BookDetails>();
      this.FreeEBookList = response.content;
      console.log(this.FreeEBookList);
    });
  }

  GetFreeAudio() {
    this.productservice.getFreeOrRetailBook('AUDIO', 'FREE').subscribe((response) => {

      this.FreeAudioList = new Array<BookDetails>();
      this.FreeAudioList = response.content;
      console.log(this.FreeAudioList);

    });
  }

  GetFreePrint() {
    this.productservice.getFreeOrRetailBook('PRINT', 'FREE').subscribe((response) => {
      this.FreePrintList = new Array<BookDetails>();
      this.FreePrintList = response.content;
      console.log(this.FreePrintList);
    });
  }
  clear(table: Table) {
    table.clear();
  }


  show(event, bookdetail) {
    this.BookDetail = bookdetail;
    this.op.show(event);
  }


  showAudio(event, bookdetail) {
    this.BookDetail = bookdetail;
    this.al.show(event);
  }


  RemoveBook(bookdetails) {
    const id = [{ 'id': bookdetails.id }];
    this.confirmationService.confirm({
      message: 'Do you want to remove this book?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productservice.addFreeOrRetailBook(id, bookdetails.bookType, 'RETAIL_SUBSCRIPTION').subscribe((response) => {
          this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have removed' }];
          this.GetFreeEBook();
          this.GetFreeAudio();
        });
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have removed' }];
        //Actual logic to perform a confirmation
      }
    });
  }





}
