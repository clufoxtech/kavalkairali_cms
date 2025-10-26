import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../product/product.service';
import { Category } from '../../product/productModel/Category';
import { Contributor } from '../../product/productModel/contributor';
import { searchlist } from '../../product/productModel/searchList';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-bookaccesspage',
  templateUrl: './bookaccesspage.component.html',
  styleUrls: ['./bookaccesspage.component.scss']
})
export class BookaccesspageComponent implements OnInit {
  public data:any[];
  public category:Array<Category>;
  public authorContributor:Array<Contributor>;
  SearchForm!: FormGroup;
  public searchDetails:searchlist;
  public selectedList:any[];
  public closable:boolean=true;
  @Output() display =new EventEmitter<boolean>();
  @Input() customerid: any;
  perPage = 10;
  page=0;
  totalRecords=1000;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,private router: Router,public addservice:ProductService,public customerservice:CustomerService) { }

  ngOnInit(): void {
    this.selectedList=[];
    this.SearchForm = this.formBuilder.group({
      bookType: ['', [Validators.required]],
      title: ['', []],
    })
   
    //this.data=[{'product':'Bhumiyude Avakashikal','version':'Audio','author':'Basheer','edition':2,'volume':1,'code':'HP4785','language':'Malayalam','mrp':'540 INR','revenue':'100 INR','royalty':20,'ramount':'42000 INR','payable':'32500 INR'}]
  }
  Cancel(){
    this.display.emit(false);
  }

  
  clear(){
    this.SearchForm.reset();
    this.data=[];
    this.selectedList=[];
  }
  Searchbook(){
    if (this.SearchForm.valid) {
      this.searchDetails= new searchlist();
    this.searchDetails=this.SearchForm.value; 
    this.searchDetails.bookStatus='PUBLISHED';
    this.addservice.searchBook(this.page,this.perPage,this.searchDetails).subscribe({
      next: (response)=>{
        this.data=response.content;
  },
  error: (err) => {
   this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
  }
})
   }
    else {
     this.validateAllFields(this.SearchForm); 
 }  
  }
  LazyLoadBookAccess(event){
    this.page = event.first / event.rows ;
    this.perPage=event.rows;
    this.Searchbook();
   
  }
  get getControl(){
    return this.SearchForm.controls;
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
        onRowSelect(event) {
          
          this.selectedList.push(event.data.id)
          console.log(this.selectedList)
          
      }
      onRowUnselect(event) {
        this.selectedList=this.selectedList.filter(x=>x!=event.data.id)
        // const index=this.selectedList.findIndex((object) => {
        //   return object.id === event.data.id;
        // });
        // this.selectedList.splice(index, 1);
        console.log(this.selectedList)
        
    }
    AddBookAccess(){
      const type=this.SearchForm.controls['bookType'].value;
      if(this.selectedList.length>0){
        this.customerservice.addOrder(this.selectedList,type,this.customerid).subscribe({
          next: (response)=>{
            this.clear();
           this.Cancel();  
           this.messageService.add({severity:'success', summary:'Success', detail:'Success'});   
      },
      error: (err) => {
       this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
      } 
      })
    }
    else{
      this.messageService.add({severity:'error', summary:'Select Book', detail:'Please select any book'});
    }
  }
}
