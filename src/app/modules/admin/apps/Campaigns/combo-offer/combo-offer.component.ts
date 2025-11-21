import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { DepartmentList } from '../../users/UserModels/DepartmentModel';
import { UserDetails } from '../../users/UserModels/UserDetailModel';
import { UserserviceService } from '../../users/userservice.service';
import { CampaignService } from '../campaign.service';
import { ActivateList, ComboOfferList } from '../CampaignModel/coupon';
import { ProductService } from '../../product/product.service';
import { searchlist } from '../../product/productModel/searchList';
import { MultipleSearch } from '../../Recommendation/ModelRecommendation/MultipleSearch';
import { RecommendationService } from '../../Recommendation/recommendation.service';
import { Category } from '../../product/productModel/Category';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-combo-offer',
  templateUrl: './combo-offer.component.html',
  styleUrls: ['./combo-offer.component.scss']
})
export class ComboOfferComponent implements OnInit {
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  @ViewChild('op',{static:true}) ele: ElementRef;
  @ViewChild('al',{static:true}) al: OverlayPanel;
  @ViewChild('dc',{static:true}) dc: OverlayPanel;
  constructor(private messageService: MessageService,public formBuilder: FormBuilder,public campaignService:RecommendationService,public productService:ProductService,private comboService:CampaignService,private router: Router,private confirmationService: ConfirmationService) { }
  public ActiveList :Array<ComboOfferList>=[];
  public DeActiveList :Array<ComboOfferList>=[];
  public NewList:Array<ComboOfferList>=[];
  msgs: Message[] = [];
  public status:string;
  public index:number;
  AddForm!: FormGroup;
  public NoOfBooks:Array<any>;
  selectedLimitType: any;
  selectedOfferType: any='';
public OfferType:Array<any>;
selectedBooks: number[] = [];
selectedBookType: any;
public BookType:Array<any>;
perPage = 50;
page=0;
totalRecords=50000;
ActivateForm!: FormGroup;
SearchForm!: FormGroup;
public comboAddList:ComboOfferList;
  public comboDetail:ComboOfferList;
  public activateList:ActivateList;
  public bookList:Array<any>;
  public searchDetails:MultipleSearch;
  selectedBookMrp: any[] = [];
  allowOtherOffersValue: boolean;
  public isEdit:boolean=false;
  selectedCategory: Array<Category>;
  filtercategory:Array<Category>=[];
  public category:Array<Category>;
  public selectedBookLength:number;
  list: any[] = []; // Initialize list array
public selectedList:any[]=[];
  ngOnInit(): void {
    this.index=0;
    this.status='ACTIVE';
    this.comboDetail=new ComboOfferList(); 
  this.GetActiveComboOffer();
  this.GetDeActiveComboOffer();
  this.GetCategory();
    this.GetAuthorContributor('AUTHOR');
  this.AddForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    offerPrice: ['', [Validators.required]],
    totalPrice : ['', [Validators.required]],
    allowOtherOffers : [false],
    booklength:['',],
    description: ['', []],
    detail: ['', []],
  }) 
  this.ActivateForm = this.formBuilder.group({
    startDate: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    
  }) 
  this.SearchForm = this.formBuilder.group({
    author: [''],
    category: [''],
    bookType: ['', [Validators.required]],
    title: ['', []],
  }) 
  }
  
  GetActiveComboOffer(){
    this.comboService.getComboOffer(this.status,this.page,this.perPage).subscribe((response)=>{
      //if(response._embedded.users.length>0){
        this.ActiveList= new Array<ComboOfferList>();
        this.ActiveList=response.content;
        console.log(this.ActiveList);
      //} 
       })
  }
 
  GetDeActiveComboOffer(){
    this.comboService.getComboOffer(this.status,this.page,this.perPage).subscribe((response)=>{
      //if(response._embedded.users.length>0){
      this.DeActiveList= new Array<ComboOfferList>();
      this.DeActiveList=response.content;
      console.log(this.DeActiveList);
      //}
       })
  }
  GetNewComboOffer(){
    this.comboService.getComboOffer(this.status,this.page,this.perPage).subscribe((response)=>{
      //if(response._embedded.users.length>0){
      this.NewList= new Array<ComboOfferList>();
      this.NewList=response.content;
      console.log(this.NewList);
      //}
       })
  }
  NewCoupon(){
    this.display=true;
    this.AddForm.reset();
    this.SearchForm.reset();
    
  this.intialisationFun();
  }
  intialisationFun(){
    this.NoOfBooks= [
     
      { name: 1, code: 1 },
      { name: 2, code: 2 },  
      { name: 3, code: 3 },
      { name: 4, code: 4 },
      { name: 5, code: 5 },
  ];
  
  this.BookType = [
    {name:'select',code:''},
    { name: 'EBOOK', code: 'EBOOK' },
    { name: 'PRINT', code: 'PRINT' } ,
    { name: 'AUDIO', code: 'AUDIO' }
  
  ];
  }
  onDropdownFilter(event: any,i:number) {
    const filterValue = event.filter; // Get the search/filter value entered by the user
   
  }
  GetCategory(){
    this.productService.getCategory().subscribe((response)=>{
      //if(response._embedded.categoryModels.length>0){
        this.category= new Array<Category>();
        this.category=response._embedded.categoryModels;
        console.log(this.category);
      //} 
       }) 
  }
  GetAuthorContributor(type:string){
    this.productService.getContributorByType(type).subscribe((response)=>{
      if(response._embedded.contributors.length>0){
      } 
       }) 
  }
 
  onBookSelectionChange(selectedBook: any, index: number) {
    if (selectedBook && selectedBook.mrp !== undefined) {
      this.selectedBookMrp[index] = selectedBook.mrp;
    }
  }
  LazyLoadActiveCombo(event){
    this.page = event.first / event.rows ;
    this.perPage=event.rows;
    this.GetActiveComboOffer();
  }
  LazyLoadDeActiveCombo(event){
    this.page = event.first / event.rows ;
    this.perPage=event.rows;
    this.GetDeActiveComboOffer();
  }
  LazyLoadNewCombo(event){
    this.page = event.first / event.rows ;
    this.perPage=event.rows;
    this.GetNewComboOffer();
  }
  handleTab(e){ 
    this.index=e.index;
    if(this.index==0){
      this.status='ACTIVE';
      this.GetActiveComboOffer();
    }
    else if(this.index==1){
      this.status='DEACTIVED';
      this.GetDeActiveComboOffer();
    }
    else if(this.index==2){
      this.status='NEW';
      this.GetNewComboOffer();
    }
    }
//   clear(table: Table) {
//     table.clear();
// }
clear(){

}
Cancel(){
  this.display=false;
  this.index=0;
  this.GetActiveComboOffer();
  this.GetDeActiveComboOffer();
  this.GetNewComboOffer();
  this.AddForm.reset();
}

show(event,comboDetail){
  this.comboDetail=comboDetail;
  this.op.show(event);
}
Edit(comboDetail){
  this.display=true;  
  this.intialisationFun();
  this.comboDetail=new ComboOfferList();
  this.comboDetail=comboDetail;
  this.selectedList=this.comboDetail.offerBooks;
  this.selectedBookLength=this.comboDetail?.offerBooks?.length;
  this.isEdit=true;
  this.selectedBookType = comboDetail.bookType;
  this.selectedBooks = Array.from({ length: comboDetail.offerBooks.length }, (_, index) => index + 1);

}
ChangeStatus(combodetail,status){
  this.comboService.changeComboStatus(combodetail,status).subscribe({
       next: (response)=>{
        this.GetActiveComboOffer();
  this.GetDeActiveComboOffer();
     this.GetNewComboOffer();   
       },
       error: (err) => {
       //  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
       }
     })
 }
 
 ActivateCoupon(){
   if (this.ActivateForm.valid) {
    this.activateList=new ActivateList();
    this.activateList.id=this.comboDetail.id;
     this.activateList.startDate=this.ActivateForm.value['startDate'];
     this.activateList.startTime=this.ActivateForm.value['startTime'];
     this.activateList.endDate=this.ActivateForm.value['endDate'];
     this.activateList.endTime=this.ActivateForm.value['endTime'];
     this.ChangeStatus(this.activateList,'ACTIVE');
     this.ActivateForm.reset();
     this.dc.hide();
   }
   else{
     this.validateAllFields(this.ActivateForm);  
   }
 }


showArchived(event,comboDetail){
  this.comboDetail=comboDetail;
  this.al.show(event);
}



ShowUser(comboDetail){
  this.comboDetail=comboDetail;
  this.user=true;
}
ChangeBookType(){
  if(!this.isEdit){
    this.selectedList=[];
    }
}

AddCoupon(){
   if (this.AddForm.valid) {
   this.comboAddList=new ComboOfferList();
   this.comboAddList=this.AddForm.value;
   this.comboAddList.books=[];
   this.comboAddList.bookType=this.searchDetails.bookType;
  this.selectedList.forEach(x=>this.comboAddList.books.push(x.id))

    console.log(this.comboAddList);
    if(this.isEdit){   
      this.comboAddList.bookType=this.comboDetail.bookType;
      this.comboAddList.id=this.comboDetail.id;
      this.comboService.editCombo(this.comboAddList).subscribe({
        next: (response)=>{
         this.Cancel();
        },
        error: (err) => {
        this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
        }
      })
    }
    else{
      this.comboService.addCombo(this.comboAddList).subscribe({
        next: (response)=>{
         this.Cancel();
        },
        error: (err) => {
        this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
        }
      })
    }
   
  }
  else if(this.AddForm.valid && this.selectedList.length==0){
    this.messageService.add({severity:'error', summary:'Empty book list', detail:'Your selected book list is empty'});
  } else {
    this.validateAllFields(this.AddForm);  
  }
}
SearchBook(){
  if (this.SearchForm.valid) {
  this.searchDetails= new MultipleSearch();
  this.searchDetails=this.SearchForm.value; 
 
  console.log(this.searchDetails);
  this.campaignService.MultisearchBook(this.page,this.perPage, this.searchDetails).subscribe({
    next: (response)=>{
      this.list = response.content;
      console.log(this.list)
      console.log(response.content)
},
error: (err) => {
//  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
}
})  
}
else{
  this.validateAllFields(this.SearchForm);
}
}
addToSelectedList(item: any) {
  const selectedBooksCount = this.selectedList.length;
  if (selectedBooksCount < this.selectedBookLength) {
    if (!this.selectedList.includes(item)) {
      this.selectedList.push(item);
    }
  }
// Add item to selectedList when checked in the "List" tab
else{
  this.messageService.add({severity:'error', summary:'Book Limit', detail:'You can add only selected number of books'});
  alert("limit crossed")
}

}

removeFromSelectedList(item: any) {
// Remove item from selectedList when unchecked in the "Selected" tab
const index = this.selectedList.indexOf(item);
if (index !== -1) {
    this.selectedList.splice(index, 1);
}
}

onRowSelect(event: any) {
// Add selected row to selectedList and remove it from list
this.addToSelectedList(event.data);
const index = this.list.indexOf(event.data);
if (index !== -1) {
    this.list.splice(index, 1);
}
}

onRowUnselect(event: any) {
// Remove unselected row from selectedList and add it back to list
this.removeFromSelectedList(event.data);
this.list.push(event.data);
}
get getSearchControl(){
  return this.SearchForm.controls;
}
get getDateControl(){
  return this.ActivateForm.controls;
}  
get getControl(){
  return this.AddForm.controls;
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
}
