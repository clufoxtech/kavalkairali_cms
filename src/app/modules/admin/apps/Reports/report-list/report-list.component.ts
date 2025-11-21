import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Slider } from 'primeng/slider';
import { Table } from 'primeng/table';
import { CustomerDetails } from '../../Customers/CustomerModels/Customerdetails';
import { FilterModel } from '../../Customers/CustomerModels/dropdownfilter';
import { BookDetails } from '../../product/productModel/bookdetails';
import { orderSearch, searchlist } from '../../product/productModel/searchList';
import { UserserviceService } from '../../users/userservice.service';
import { ReportsService } from '../reports.service';
import { ProductService } from '../../product/product.service';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  @ViewChild('om',{static:true}) om: OverlayPanel;
  @ViewChild('oep',{static:true}) oep: OverlayPanel;
  @ViewChild('opp',{static:true}) opp: OverlayPanel;
  @ViewChild('oap',{static:true}) oap: OverlayPanel;
  @ViewChild('oad',{static:true}) oad: OverlayPanel;
  @ViewChild('opd',{static:true}) opd: OverlayPanel;
  @ViewChild('oeb',{static:true}) oeb: OverlayPanel;
  @ViewChild('oed',{static:true}) oed: OverlayPanel;
  @ViewChild('opb',{static:true}) opb: OverlayPanel;
  @ViewChild('opa',{static:true}) opa: OverlayPanel;
  @ViewChild('oab',{static:true}) oab: OverlayPanel;
  @ViewChild('bookSlider') bookSlider: Slider;
  public data = [];
  public customer:boolean=false;
  public edit:boolean=false;
  public blockreason:boolean=false;
  public bookdetails:BookDetails;
  public blockedcustomer:CustomerDetails;
  representatives:FilterModel[];
  public order:Array<any>;
  public books:Array<any>;
  public authors:Array<any>;
  public ebookorder:Array<any>;
  public ebookbooks:Array<any>;
  public ebookauthor:Array<any>;
  public ebookoffer:Array<any>;
  public printorder:Array<any>;
  public printbooks:Array<any>;
  public printauthor:Array<any>;
  public printoffer:Array<any>;
  public audioorder:Array<any>;
  public audiobooks:Array<any>;
  public audioauthor:Array<any>;
  public audiooffer:Array<any>;
  public bookList:Array<any>;
  public searchDetails:searchlist;
  public  selectedBook: string;
  public  selectedAuthor: string;
  public exportlist:Array<any>;
  public index:number;
  cities:FilterModel[];
  @ViewChild('dt1') table: Table;
  perPage = 50;
  page=0;
  totalRecords=500000;
  searchOrder:Array<any>; 
  filterList:Array<any>;
  public statusIndex:number;
  searchInputControl=new FormControl('');
  platform:Array<any>;
  selectedPlatform: any;
  rangeValuesofBook: any;
  rangeValuesofAmount: any;
  bookName:string;
  selectedDateRange: Date[] = [];
  ifFilter:boolean=false;
  filterCount:number=0;
  processOrder:boolean=false;
  orderDispatched:boolean=false;
  public OfferType:Array<any>;
  startDate: any;
  endDate: any;
bookType:string;
  constructor(private zone: NgZone,private productservice:ProductService,private router: Router,private reportservice:ReportsService,private confirmationService: ConfirmationService , public userService:UserserviceService, public messageservice :MessageService) { }
 
  ngOnInit(): void {
    this.exportlist=[];
    this.index=0;
    this.statusIndex=0; 
    this.bookType='PRINT'; 
    this.searchDetails=new searchlist();
    this.searchDetails.bookType=this.bookType;
    this.searchDetails.title='';
    this.GetBookList(this.searchDetails);
   this. ClearFilter();
  }
  handleChange(e) {
    this.order=new Array<any>();
    this.selectedDateRange=[];
    this.AssignOrder(this.order);
    this.index = e.index;
   if(this.index==0)
   {
  this.bookType='PRINT';
  }
  else if(this.index==1){
    this.bookType='EBOOK';
  }
  else{
    this.bookType='AUDIO';
  }
}
  onDateRangeChange() {
    if (this.selectedDateRange && this.selectedDateRange.length === 2) {
      const datefrom = (this.selectedDateRange && this.selectedDateRange[0] !== null && this.selectedDateRange[0] !== undefined)
  ? this.selectedDateRange[0]
  : '';
  const dateto=(this.selectedDateRange && this.selectedDateRange[1] !== null && this.selectedDateRange[1] !== undefined)
  ? this.selectedDateRange[1]
  : '';
      this.startDate = formatDateToYYYYMMDD(datefrom);
      this.endDate = formatDateToYYYYMMDD(dateto);
      if(this.startDate && this.endDate){
        this.GetOrders(this.bookType);
      }
      else{
        this.messageservice.add({severity:'error', summary:'Select data range ', detail:'Please select date range'});
      }
    }
   
  }
  GetOrders(bookType:string){
   
      this.reportservice.getOrders(bookType,this.startDate,this.endDate).subscribe((response)=>{
        //if(response.content.length>0){
          this.order= new Array<any>();
          this.order=response;
          this.exportlist=this.order;
       //} 
       this.AssignOrder(this.order);
         }) 
    
    
  }
  AssignOrder(order:any){
    if(this.index==0){
      this.printorder=this.order;
     }
     else if(this.index==1){
      this.ebookorder=this.order;
     }
     else if(this.index==2){
      this.audioorder=this.order;
     }
  }
  onFilterBooks(event){
    console.log(event);
    this.searchDetails=new searchlist();
    this.searchDetails.bookType=this.bookType;
    this.searchDetails.title=event.filter;
    this.GetBookList(this.searchDetails);
  }
  GetBookList(searchDetails){
    console.log(searchDetails);
    this.productservice.searchBook(0,500,searchDetails).subscribe({
      next: (response)=>{
        this.bookList=response.content;
  },
  error: (err) => {
  //  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
  }
})
  }
  DateRangeandBook(){
    this.startDate='';
    this.endDate='';
    this.selectedBook=(this.selectedBook!=undefined)?this.selectedBook:'';
    if (this.selectedDateRange && this.selectedDateRange.length === 2) {
      const datefrom = (this.selectedDateRange && this.selectedDateRange[0] !== null && this.selectedDateRange[0] !== undefined)
  ? this.selectedDateRange[0]
  : '';
  const dateto=(this.selectedDateRange && this.selectedDateRange[1] !== null && this.selectedDateRange[1] !== undefined)
  ? this.selectedDateRange[1]
  : '';
      this.startDate = formatDateToYYYYMMDD(datefrom);
      this.endDate = formatDateToYYYYMMDD(dateto);
     
    }
    if(this.selectedBook && this.startDate && this.endDate){
      this.reportservice.getBooks(this.selectedBook,this.bookType,this.startDate,this.endDate).subscribe((response)=>{
        //if(response.content.length>0){
          this.books= new Array<any>();
          this.books=response;
          this.exportlist=this.books;
       //} 
       this.AssignBooks(this.books);
         })
    }
    else{
      this.messageservice.add({severity:'error', summary:'Select data range and book name', detail:'Please select both filter'});
    }
   
  }
  AssignBooks(books){
    if(this.index==0){
      this.printbooks=books;
     }
     else if(this.index==1){
      this.ebookbooks=books;
     }
     else if(this.index==2){
      this.audiobooks=books;
     }
  }
  DateRangeandAuthor(){
 
    this.selectedAuthor=(this.selectedAuthor!=undefined)?this.selectedAuthor:'';
    if (this.selectedDateRange && this.selectedDateRange.length === 2) {
      const datefrom = (this.selectedDateRange && this.selectedDateRange[0] !== null && this.selectedDateRange[0] !== undefined)
  ? this.selectedDateRange[0]
  : '';
  const dateto=(this.selectedDateRange && this.selectedDateRange[1] !== null && this.selectedDateRange[1] !== undefined)
  ? this.selectedDateRange[1]
  : '';
      this.startDate = formatDateToYYYYMMDD(datefrom);
      this.endDate = formatDateToYYYYMMDD(dateto);
     
    }
    if(this.selectedAuthor && this.startDate && this.endDate){
    this.reportservice.getAuthors(this.selectedAuthor,this.bookType,this.startDate,this.endDate).subscribe((response)=>{
      //if(response.content.length>0){
        this.authors= new Array<any>();
        this.authors=response;
        this.exportlist=this.authors;
     //} 
     this.AssignAuthors(this.authors);
       }) 
      }
      else{
        this.messageservice.add({severity:'error', summary:'Select data range and author name', detail:'Please select both filter'});
      }
  }
  AssignAuthors(authors){
    if(this.index==0){
      this.printauthor=authors;
     }
     else if(this.index==1){
      this.ebookauthor=authors;
     }
     else if(this.index==2){
      this.ebookauthor=authors;
     }
  }
  ClearFilter(){
    this.selectedAuthor='';
    this.selectedBook='';
    this.selectedDateRange=[];
    this.ebookorder=new Array<any>();
    this.printorder=new Array<any>();
    this.audioorder=new Array<any>();
    this.ebookbooks=new Array<any>();
    this.printbooks=new Array<any>();
    this.audiobooks=new Array<any>();
    this.ebookauthor=new Array<any>();
    this.printauthor=new Array<any>();
    this.audioauthor=new Array<any>();
  }
  More(event){ 
    this.om.show(event);
  }
  Export(){
    if(this.exportlist.length>0){
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.exportlist);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
        const excelBuffer: any = xlsx.write(workbook, {
          bookType: "xlsx",
          type: "array"
        });
        this.userService.saveAsExcelFile(excelBuffer, "OrderList");
      });
     }
  } 

calculateSum(sumof) {
  const arrays = [
    [this.printorder, this.printbooks, this.printauthor], // Arrays for index 0
    [this.ebookorder, this.ebookbooks, this.ebookauthor], // Arrays for index 1
    [this.audioorder, this.audiobooks, this.audioauthor]  // Arrays for index 2
  ];

  // Get the selected array based on this.index and this.statusIndex
  const selectedArray = arrays[this.index][this.statusIndex];

  // Calculate sum based on the selected array and property
  return selectedArray.reduce((total, product) => total + product[sumof], 0);
}

  

  showebookPublish(event,product){
    this.bookdetails=product;
    this.oep.show(event);
  }
 
  

  
  ShowOrder(product){
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`apps/Orders/orderdetails`, product])
    );
    console.log(url)
    var currentPath = window.location.href.substr(0, window.location.href.indexOf('#') + 1);
    var fullPath = currentPath + url;
    console.log(fullPath)
    try {
      window.open(fullPath,'_blank');
    } catch (error) {
      console.error("Error opening new window:", error);
    }
    // this.router.navigate([`apps/Orders/orderdetails`,product]);  
  }
  
  Delete(bookdetails){
    this.confirmationService.confirm({
      message: 'Do you want to delete this book?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        // this.orderservice.deleteBook(bookdetails.id).subscribe((response)=>{
          
        //     }) 
      },
      reject: () => {
        //Actual logic to perform a confirmation
    }
  });
  }

 
 
 

handleChangeStatus(e) {
  this.statusIndex = e.index;
  this.searchInputControl.patchValue('');
  this.RemoveFilter();
 
}

SearchOrder(): Promise<any>{
  return new Promise<any[]>((resolve, reject) => {

  
  })
}



  
RemoveFilter(){
  this.selectedDateRange=null;
  this.selectedPlatform='';
  this.rangeValuesofAmount='';
  this.rangeValuesofBook= '';
  this.bookName='';
  this.ifFilter=false;
 
}  
 FilterOrder(): Promise<any>{
  return new Promise<any[]>((resolve, reject) => {
  
  })
 } 

 


}
function formatDateToYYYYMMDD(date) {
  // Ensure you have a valid Date object
  if (!(date instanceof Date)) {
    return null; // Return null or handle the invalid date case
  }

  const year = date.getFullYear();
  // GetMonth returns 0-indexed, so add 1 to get the correct month
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Zero-padding the month
  const day = date.getDate().toString().padStart(2, '0'); // Zero-padding the day

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

