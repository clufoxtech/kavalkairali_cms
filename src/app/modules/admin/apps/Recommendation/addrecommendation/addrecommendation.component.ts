import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../product/product.service';
import { BookDetails } from '../../product/productModel/bookdetails';
import { Category } from '../../product/productModel/Category';
import { DepartmentList } from '../../users/UserModels/DepartmentModel';
import { MultipleSearch } from '../ModelRecommendation/MultipleSearch';
import { RecommendationService } from '../recommendation.service';

@Component({
  providers: [MessageService],
  selector: 'app-addrecommendation',
  templateUrl: './addrecommendation.component.html',
  styleUrls: ['./addrecommendation.component.scss']
})
export class AddrecommendationComponent implements OnInit {
  SearchForm!: FormGroup;
  public product:DepartmentList;
  selectedCategory: Array<Category>;
filtercategory:Array<Category>=[];
public category:Array<Category>;
public data:Array<BookDetails>;
public bookType:string;
public recommendationType:string;
public searchDetails:MultipleSearch;
selectedProduct: any;
public selectedList:any[];
public selectedCount:any;
perPage = 20;
  page=0;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public addservice:ProductService,private router: Router,private Aroute: ActivatedRoute,public recommendationService:RecommendationService) { }

  ngOnInit(): void {
    this.SearchForm = this.formBuilder.group({
      category: ['', []],
      author: ['', []],
      title: ['', []],
      
    }) 
    this.Aroute.params.subscribe(params => {
      this.bookType=params['bookType'];
      this.recommendationType=params['recommendationType'];
    });
    this.GetCategory();
    //this.data=[{'product':'Bhumiyude Avakashikal','version':'Audio','author':'Basheer','edition':2,'volume':1,'code':'HP4785','language':'Malayalam','mrp':'540 INR','revenue':'100 INR','royalty':20,'ramount':'42000 INR','payable':'32500 INR'}]
  }
  GetCategory(){
    this.addservice.getCategory().subscribe((response)=>{
      //if(response._embedded.categoryModels.length>0){
        this.category= new Array<Category>();
        this.category=response._embedded.categoryModels;
        console.log(this.category);
      //} 
       }) 
  }

  GoBack(){
    this.router.navigate([`apps/Recommendation/recommendationlist`]); 
  }
  onSelectionChange(event: any) {
    this.selectedCount = this.selectedProduct.length;
  }
  AddRecommendation(){
    this.selectedList=[];
    this.selectedProduct.forEach(x=>{
      this.selectedList.push({'id':x.id})
    })
    if(this.selectedList.length>0){
      console.log(this.selectedList)
      this.recommendationService.addRecommendation(this.selectedList,this.bookType,this.recommendationType).subscribe({
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

  clear(){
    this.SearchForm.reset();
    this.data=[];
  }

  Searchbook(){
    if (this.SearchForm.valid) {
      this.searchDetails= new MultipleSearch();
    this.searchDetails=this.SearchForm.value; 
    this.searchDetails.bookType=this.bookType;
    console.log(this.searchDetails);
    this.recommendationService.MultisearchBook(this.page,this.perPage, this.searchDetails).subscribe({
      next: (response)=>{
        this.data=response.content;
        console.log(this.data)
        console.log(response.content)
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
}
