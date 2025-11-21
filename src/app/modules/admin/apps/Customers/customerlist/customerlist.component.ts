import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { CustomerDetails } from '../CustomerModels/Customerdetails';
import { FilterModel } from '../CustomerModels/dropdownfilter';
import { Table } from 'primeng/table';
import { UserserviceService } from '../../users/userservice.service';
import { CustomerService } from '../customer.service';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { customerSearch } from '../../product/productModel/searchList';
import { BlockedReason } from '../../product/productModel/blockedreason';
@Component({
  providers: [ConfirmationService],
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.scss']
})
export class CustomerlistComponent implements OnInit {
  @ViewChild('op',{static:true}) op: OverlayPanel;
  @ViewChild('om',{static:true}) om: OverlayPanel;
  @ViewChild('ob',{static:true}) ob: OverlayPanel;
  @ViewChild('vo',{static:true}) vo: OverlayPanel;
  @ViewChild('oa',{static:true}) oa: OverlayPanel;
  @ViewChild('mb',{static:true}) mb: OverlayPanel;
  @ViewChild('ma',{static:true}) ma: OverlayPanel;
  @ViewChild('all',{static:true}) all: OverlayPanel;
  // searchInputControl: UntypedFormControl = new UntypedFormControl();
  searchInputControl=new FormControl('');
  public viewreason = CustomerDetails;
  public addlist=[];
  public customer:boolean=false;
  //public edit:boolean=false;
  public blockreason:boolean=false;
  public importfile:boolean=false;
  public Blockreason:Array<BlockedReason>;
  public customerdetails:any;
  public blockedcustomer:Array<CustomerDetails>;
  public activecustomer:Array<CustomerDetails>;
  public archivecustomer:Array<CustomerDetails>;
  public exportdetails:Array<CustomerDetails>;
  public allCustomers:Array<CustomerDetails>;
  public customersearch:customerSearch;
  representatives:FilterModel[];
  public index:number;
  membership:FilterModel[];
  @ViewChild('dt1') table: Table;
  AddBlockForm!: FormGroup;
  public filterOn:boolean=false;
  //public filterOff:boolean=false;
  file:File;
  arrayBuffer:any;
  filelist:any;
  public display:boolean=false;
  perPage = 10;
  page=0;
  totalRecords=0;
  searchlist:Array<any>;
  constructor(private router: Router,public formBuilder: FormBuilder,private confirmationService: ConfirmationService,public userservice:UserserviceService,public customerservice:CustomerService) { }

  ngOnInit(): void {
    this.index=0;
    this.GetOnInitFunction();
    this.AddBlockForm = this.formBuilder.group({
      blockreason: ['', [Validators.required]],
      blockcomment: ['', [Validators.required]],
     
    })
    this.representatives = [
      { name: "Amy Elsner",value:"AM" },
      { name: "Anna Fali" ,value:"AF"},
      { name: "Asiya Javayant",value:"AJ"},
      { name: "Bernardo Dominic",value:"BD"},
      { name: "Elwin Sharvill",value:"ES"},
    ];
    this.membership = [
      {name: 'Nil', value: 'nil'},
      {name: 'Yes',  value: 'yes'},
      {name: 'No',  value: 'no'},
      {name: 'Active',  value: 'ACTIVE'},
      {name: 'True',  value: true},
  ];
  
  }
  GetOnInitFunction(){
    this.GetActiveCustomerList();
    this.GetBlockedCustomerList();
    this.GetArchivedCustomerList();
    this.GetAllCustomerList();
  }
  NewCustomer(){
    this.display=true;
  }
  LazyLoadAllCustomer(event){
    this.page = event.first / event.rows ;
    this.perPage=event.rows;
    if(this.customersearch?.name){
      this.SearchCustomer().then(() => {
        this.allCustomers= new Array<CustomerDetails>();
        this.allCustomers= this.searchlist;
        })
    }
    else{
      this.GetAllCustomerList();
    }
   
  }
  LazyLoadActiveCustomer(event){
    this.page = event.first / event.rows ;
    this.perPage=event.rows;
    if(this.customersearch?.name){
      this.SearchCustomer().then(() => {
        this.activecustomer= new Array<CustomerDetails>();
        this.activecustomer= this.searchlist;
        })
    }
    else{
      this.GetActiveCustomerList();
    }
   
  }
  LazyLoadBlockCustomer(event){
    this.page = event.first / event.rows ;
    this.perPage=event.rows;
    if(this.customersearch?.name){
      this.SearchCustomer().then(() => {
        this.blockedcustomer= new Array<CustomerDetails>();
        this.blockedcustomer= this.searchlist;
        })
    }
    else{
      this.GetBlockedCustomerList();
    }
   
  }
  LazyLoadArchiveCustomer(event){
    this.page = event.first / event.rows ;
    this.perPage=event.rows;
    if(this.customersearch?.name){
      this.SearchCustomer().then(() => {
        this.archivecustomer= new Array<CustomerDetails>();
        this.archivecustomer= this.searchlist;
        })
    }
    else{
      this.GetArchivedCustomerList();
    }
   
  }
  GetAllCustomerList(){
    this.customerservice.getAllCustomer(this.page,this.perPage).subscribe((response)=>{
      this.allCustomers= new Array<CustomerDetails>();
      this.allCustomers=response?._embedded?.customers;
      // this.allCustomers.forEach(x=>{
      //   x.creationTimestamp=moment(x.creationTimestamp).format('DD-MM-YYYY'); 
      // })
      console.log(this.allCustomers);
      this.totalRecords=response.page.totalElements;
       })
  }
  GetActiveCustomerList(){
    this.activecustomer= new Array<CustomerDetails>();
    this.customerservice.getCustomerByStatus('ACTIVE',this.page,this.perPage).subscribe((response)=>{
      this.activecustomer= new Array<CustomerDetails>();
      this.activecustomer=response?._embedded?.customers;
      this.activecustomer.forEach(x=>{
        x.creationTimestamp=moment(x.creationTimestamp).format('DD-MM-YYYY'); 
      })
      console.log(this.activecustomer);
      this.totalRecords=response.page.totalElements;
       })
  }
  GetBlockedCustomerList(){
    this.blockedcustomer= new Array<CustomerDetails>();
    this.customerservice.getCustomerByStatus('BLOCKED',this.page,this.perPage).subscribe((response)=>{
      this.blockedcustomer= new Array<CustomerDetails>();
      this.blockedcustomer=response?._embedded?.customers;
      console.log(this.blockedcustomer);
      this.totalRecords=response.page.totalElements;
       })
  }
  GetArchivedCustomerList(){
    this.customerservice.getCustomerByStatus('ARCHIVED',this.page,this.perPage).subscribe((response)=>{
      this.archivecustomer= new Array<CustomerDetails>();
      this.archivecustomer=response?._embedded?.customers;
      console.log(this.archivecustomer);
      this.totalRecords=response.page.totalElements;
       })
  }
  show(event,product){
    this.customerdetails=product;
    this.op.show(event);
  }
  BlockCustomer(customerdetails){
    this.confirmationService.confirm({
      message: 'Do you want to block this customer?',
      header: 'Block Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.blockreason=true;
        this.customerservice.getBlockReason().subscribe((response)=>{
          this.Blockreason = new Array<BlockedReason>();
          this.Blockreason=response._embedded.blockReasons;

           })
          
      },
      reject: () => {
        //Actual logic to perform a confirmation
    }
  });
  }
  ArchiveCustomer(customerdetails){
    this.confirmationService.confirm({
      message: 'Do you want to archive this customer?',
      header: 'Archive Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.customerservice.changeStatus('ARCHIVED',customerdetails.id).subscribe((response)=>{
          this.GetActiveCustomerList();
    this.GetBlockedCustomerList();
    this.GetArchivedCustomerList();
           })
       
      },
      reject: () => {
        //Actual logic to perform a confirmation
    }
  });
  }
 
  OnfilterBtn(){
    this.filterOn=false;
    this.table.clear();
  }
  OfffilterBtn(){
    this.filterOn=true;
  }
  UnblockCustomer(customerdetails){
    this.confirmationService.confirm({
      message: 'Do you want to active this customer?',
      header: 'Active Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.customerservice.changeStatus('ACTIVE',customerdetails.id).subscribe((response)=>{
          this.GetAllCustomerList();
          this.GetActiveCustomerList();
    this.GetBlockedCustomerList();
    this.GetArchivedCustomerList();
  })
      },
      reject: () => {
        //Actual logic to perform a confirmation
    }
  });
  }

  ActiveCustomer(customerdetails){
    this.confirmationService.confirm({
      message: 'Do you want to active this customer?',
      header: 'Active Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.customerservice.changeStatus('ACTIVE',customerdetails.id).subscribe((response)=>{
          this.GetActiveCustomerList();
    this.GetBlockedCustomerList();
    this.GetArchivedCustomerList();
  })
      },
      reject: () => {
        //Actual logic to perform a confirmation
    }
  });
  }
  onDateSelect(value) {
    this.table.filter(value, 'date', 'between')
}
handleChange(e) {
  this.index = e.index;
  this.searchInputControl.patchValue('');
  this.GetActiveCustomerList();
  this.GetBlockedCustomerList();
  this.GetArchivedCustomerList();
  this.GetAllCustomerList();
 
}
applyGlobalFilter(event){
  this.customersearch=new customerSearch();
  this.customersearch.name=event.target.value;
  if( this.customersearch.name){
  if(this.index==0){
    this.customersearch.customerType='';
    this.SearchCustomer().then(() => {
      this.allCustomers= new Array<CustomerDetails>();
      this.allCustomers=this.searchlist ;
      })
  }
  else if(this.index==1){
    this.customersearch.customerType='ACTIVE';
    this.SearchCustomer().then(() => {
    this.activecustomer= new Array<CustomerDetails>();
    this.activecustomer=this.searchlist;
  })
  }
  else if(this.index==2){
    this.customersearch.customerType='BLOCKED';
    this.SearchCustomer().then(() => {
    this.blockedcustomer= new Array<CustomerDetails>();
    this.blockedcustomer= this.searchlist; 
  })
  }
  else if(this.index==3){
    this.customersearch.customerType='ARCHIVED';
    this.SearchCustomer().then(() => {
    this.archivecustomer= new Array<CustomerDetails>();
      this.archivecustomer=this.searchlist;
    })
  }
}
  else{
    this.GetActiveCustomerList();
    this.GetBlockedCustomerList();
    this.GetArchivedCustomerList();
    this.GetAllCustomerList(); 
  }
}
SearchCustomer(): Promise<any>{
  return new Promise<any[]>((resolve, reject) => {
  this.customerservice.searchCustomer(this.customersearch,this.page,this.perPage).subscribe({
    next: (response)=>{
      this.searchlist=response?._embedded?.customers;
      resolve(this.searchlist);
},
error: (err) => {
//  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
}
})

  })
}
exportExcel() {

  if(this.index==0){
    this.exportdetails= new Array<CustomerDetails>;
    this.exportdetails=this.activecustomer;
  }
  else if(this.index==1){
    this.exportdetails=this.blockedcustomer;
  }
  else if(this.index==2){
    this.exportdetails=this.archivecustomer;
  }

  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.exportdetails);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.userservice.saveAsExcelFile(excelBuffer, "Customer");
});
  }
ImportExcel(){
this.importfile=true;
}
onUpload(event) {
  // let input = event.files;
  // let reader: FileReader = new FileReader();
  // reader.readAsText(input[0]);
  // reader.onload = (e) => {
  //   let csv: any= reader.result;
  //   alert(csv);
  //   console.log(csv);
  // }
   this.file= event.files[0];     
  // let fileReader = new FileReader();    
  // fileReader.readAsArrayBuffer(this.file);     
  // fileReader.onload = (e) => {    
  //     this.arrayBuffer = fileReader.result;    
  //     var data = new Uint8Array(this.arrayBuffer);    
  //     var arr = new Array();    
  //     for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
  //     var bstr = arr.join("");    
  //     var workbook = XLSX.read(bstr, {type:"binary"});    
  //     var first_sheet_name = workbook.SheetNames[0];    
  //     var worksheet = workbook.Sheets[first_sheet_name];    
  //     console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
  //       var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
  //           this.filelist = [];    
  //           console.log(this.filelist)    
    
  // }  
  console.log(this.file)
  this.customerservice.importCustomer(this.file).subscribe((response)=>{ 
    this.importfile=false;   
    this.GetActiveCustomerList();
    this.GetBlockedCustomerList();
    this.GetArchivedCustomerList();
})  
}
ShowCustomer(product){
this.customerdetails=product;
this.router.navigate([`apps/Customers/customerdetails`,this.customerdetails]); 
}

  Cancel(){
    this.blockreason=false;
  }
  SubmitReason(){
    var id=this.customerdetails.id;
    if (this.AddBlockForm.valid) {
      var reason=this.AddBlockForm.controls['blockreason'].value;
      var comment=this.AddBlockForm.controls['blockcomment'].value;
    this.customerservice.addBlockReason(reason,comment,id).subscribe((response)=>{   
      this.blockreason=false;
      this.GetAllCustomerList();
      this.GetActiveCustomerList();
      this.GetBlockedCustomerList();
      this.GetArchivedCustomerList();
})

}
else {
  this.validateAllFields(this.AddBlockForm); 
} 
  }

  More(event){ 
    this.om.show(event);
  }
  BlockedReason(){
    this.router.navigate([`apps/Customers/blockedreason`]); 
  }
  showBlocked(event,product){
    this.customerdetails=product;
    this.ob.show(event);
  }
  showAll(event,product){
    this.customerdetails=product;
    if(this.customerdetails.status=='ACTIVE' || this.customerdetails.status=='ARCHIVED'){
    this.all.show(event);
    }
    else if(this.customerdetails.status=='BLOCKED'){
      this.ob.show(event);
      }
  }
  ViewReason(event,product){
    this.viewreason=product;
    this.vo.show(event);
  }
  showArchive(event,product){
    this.customerdetails=product;
    this.oa.show(event);
  }
  
MoreBlocked(event){ 
  this.mb.show(event);
}
MoreArchive(event){ 
  this.ma.show(event);
}


get getControl(){
  return this.AddBlockForm.controls;
}


validateAllFields(formGroup: FormGroup) {         
  Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);            
      if (control instanceof FormControl) {             
          control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
          this.validateAllFields(control);  
      }
  });
}

loadDataOnScroll(event: LazyLoadEvent){
  this.page = event.first / event.rows ;
  this.perPage=event.rows;
console.log(event.first);
//this.data.push(this.addlist)
if(this.customersearch.name){
  this.SearchCustomer().then(() => {
  this.activecustomer= new Array<CustomerDetails>();
  this.activecustomer= this.searchlist;
  })
}
else{
  this.GetActiveCustomerList();
}
}
CancelCustomer(display:any){
  this.display=display;
}
clear(){
  this.searchInputControl.setValue('');
  this.customersearch=new customerSearch();
  this.GetOnInitFunction();
}
}
