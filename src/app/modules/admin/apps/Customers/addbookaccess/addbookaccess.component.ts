import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl} from '@angular/forms';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product/product.service';
import { Table } from 'primeng/table';
import { BookDetails } from '../../product/productModel/bookdetails';
import { OverlayPanel } from 'primeng/overlaypanel';
import { searchlist } from '../../product/productModel/searchList';
import { CustomerService } from '../customer.service';

@Component({
  providers: [MessageService,ConfirmationService],
  selector: 'app-addbookaccess',
  templateUrl: './addbookaccess.component.html',
  styleUrls: ['./addbookaccess.component.scss']
})
export class AddbookaccessComponent implements OnInit {
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  @ViewChild('op',{static:true}) ele: ElementRef;
  @ViewChild('al',{static:true}) al: OverlayPanel;
  constructor(public customerservice:CustomerService,private Aroute: ActivatedRoute,private router: Router,private confirmationService: ConfirmationService) { }
  public FreeEBookList :Array<BookDetails>=[];
  public FreeAudioList :Array<BookDetails>=[];
  public product:BookDetails;
  public BookDetail:BookDetails;
  msgs: Message[] = [];
  public status:string;
  public index:number;
  public data:any[];
  SearchForm!: FormGroup;
  public searchDetails:searchlist;
  public selectedList:any[];
  public closable:boolean=true;
  public customerid:number;
  public booklist:Array<any>;
  ngOnInit(): void {
    this.index=0;
    //this.data=[{'product':'Bhumiyude Avakashikal','version':'Audio','author':'Basheer','edition':2,'volume':1,'code':'HP4785','language':'Malayalam','mrp':'540 INR','revenue':'100 INR','royalty':20,'ramount':'42000 INR','payable':'32500 INR'}]
    this.Aroute.params.subscribe(params => {
      this.customerid=params['id'];
      localStorage.setItem('customerid',JSON.stringify(this.customerid));
      
    });
    var id=localStorage.getItem('customerid');
    var Id=JSON.parse(id);
    
this.GetPurchasedBook(this.customerid)
  }
  AddFreeBook(){
    this.display=true;    
  }
 GetPurchasedBook(id){
  this.customerservice.getPurchasedBook(id).subscribe((response)=>{
    //if(response.content.length>0){
      this.booklist= new Array<any>();
      this.booklist=response.content;
      
   // } 
     })
 }
  clear(table: Table) {
    table.clear();
}


show(event,bookdetail){
  this.BookDetail=bookdetail;
  this.op.show(event);
}


showAudio(event,bookdetail){
  this.BookDetail=bookdetail;
  this.al.show(event);
}


RemoveBook(bookdetails){
  const id=[{'id':bookdetails.id}]
  this.confirmationService.confirm({
    message: 'Do you want to remove this book?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      //  this.productservice.addFreeOrRetailBook(id,bookdetails.bookType,'RETAIL_SUBSCRIPTION').subscribe((response)=>{
      //   this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have removed'}];
        
      //    })
    },
    reject: () => {
      this.msgs = [{severity:'info', summary:'Rejected', detail:'You have removed'}];
      //Actual logic to perform a confirmation
  }
}); 
}

Cancel(display:any){
  this.display=display;
  this.GetPurchasedBook(this.customerid);
}

}
