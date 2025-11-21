import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductService } from '../product.service';
import { Category } from '../productModel/Category';
import { searchlist } from '../productModel/searchList';

@Component({
  providers: [MessageService],
  selector: 'app-addretailbook',
  templateUrl: './addretailbook.component.html',
  styleUrls: ['./addretailbook.component.scss']
})
export class AddretailbookComponent implements OnInit {
public data:any[];
public category:Array<Category>;
SearchForm!: FormGroup;
  public searchDetails:searchlist;
  public selectedList: any[];
  perPage: number = 10;
  page: number=0;
  searchDetails1: any[];
  loadBook: any;
  totalRecords: number=500000;
constructor(public formBuilder: FormBuilder,private messageService: MessageService,private router: Router,public addservice:ProductService)  { }

  ngOnInit(): void {
    this.selectedList=[];
    this.SearchForm = this.formBuilder.group({
      bookType: ['', [Validators.required]],
      category: ['', []],
      author: ['', []],
      title: ['', []],
    });
    this.GetCategory();
    //this.data=[{'product':'Bhumiyude Avakashikal','version':'Audio','author':'Basheer','edition':2,'volume':1,'code':'HP4785','language':'Malayalam','mrp':'540 INR','revenue':'100 INR','royalty':20,'ramount':'42000 INR','payable':'32500 INR'}]
  }
  GoBack(){
    this.router.navigate([`apps/product/retaillist`]);
  }
  GetCategory(){
    this.addservice.getCategory().subscribe((response)=>{
      if(response._embedded.categoryModels.length>0){
        this.category= new Array<Category>();
        this.category=response._embedded.categoryModels;
        console.log(this.category);
      }
       });
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
    this.addservice.searchBook(this.page,this.perPage,this.searchDetails).subscribe({
      next: (response)=>{
        this.data=response.content;
        console.log(this.data);
        console.log(response.content);
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
          
          this.selectedList.push({'id':event.data.id})
          console.log(this.selectedList)
          
      }
      onRowUnselect(event) {
        const index=this.selectedList.findIndex((object) => {
          return object.id === event.data.id;
        });
        this.selectedList.splice(index, 1);
        console.log(this.selectedList)
        
    }
    cancel(){
      
    }
    AddRetailBook(){
      const type=this.SearchForm.controls['bookType'].value;
      console.log(type)
      if(this.selectedList.length>0){
        this.addservice.addFreeOrRetailBook(this.selectedList,type,'RETAIL').subscribe({
          next: (response)=>{
            this.clear();
            this.GoBack();
            
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

  LoadBookPerPage(): Promise<any>{
    return new Promise<any[]>((resolve, reject) => {
    this.addservice.searchBook(this.page,this.perPage,this.searchDetails).subscribe({
      next: (response)=>{
        this.data=response?.content;
        resolve(this.data);
  },
  error: (err) => {
   this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
  }
  });
  });
  }
 LazyLoadSearch(event) {
    this.page = event.first / event.rows ;
    this.perPage=event.rows;
    if(this.data){
      this.LoadBookPerPage().then(() => {
        this.loadBook= new Array<any>();
        this.loadBook=this.data;
        });
      }
      else{
        this.Searchbook();
      }
  }
  }

