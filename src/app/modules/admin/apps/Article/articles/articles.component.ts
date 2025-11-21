import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ArticleList } from '../articleModel';
import { Router } from '@angular/router';
import { ArticleService } from '../articleService.services';
import { searchlist } from '../../product/productModel/searchList';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  @ViewChild('op',{static:true}) ele: ElementRef;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  searchDetails: any;
  searchArticle: any;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,private articleService: ArticleService,
    private router: Router,private confirmationService: ConfirmationService) { }
  public data =[];
  public product:ArticleList;
  AddForm!: FormGroup;
  ngOnInit(): void {
    this.user=false;
    this.AddForm = this.formBuilder.group({
      articlename: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      author: ['', [Validators.required]],
    }) 
    this.product= new ArticleList();
    this.GetAllArticle();
   
  }
  GetAllArticle(){
    this.articleService.getAllArticles().subscribe((response)=>{
      console.log(response);
      this.data=response._embedded.articles;
      this.searchArticle=response._embedded.articles;
       })  
  }
  NewArticle(){

this.router.navigate(['apps/Articles/addArticle']);
  }
  clear(table: Table) {
    table.clear();
}
Cancel(){
  this.display=false;
  this.GetAllArticle();
}
show(event,product){
  this.product=product;
  this.op.show(event);
}
Edit(product){
this.product=product;

this.router.navigate(['apps/Articles/addArticle',this.product]);
// console.log(this.product);
// this.edit=true;
this.op.hide();
}
EditCancel(edit:any){
this.edit=edit;
this.GetAllArticle();
}
Delete(){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.articleService.deleteArticles(this.product.id).subscribe(
        {
          next: (response)=>{
            this.GetAllArticle();  
      },
      error: (err) => {
        this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
       //this.Cancel();
      }
     })
       
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
});
}
AddArticle(){
  if (this.AddForm.valid) {
    this.product.title=this.AddForm.controls['articlename'].value;
    this.product.description=this.AddForm.controls['desc'].value;
    this.product.author=this.AddForm.controls['author'].value;
    console.log(this.product);
  // this.articleService.editArticles(this.product).subscribe({
  //   next: (response)=>{
  //   // if(response.sTATUS=='SUCCESS'){
  //     this.GetAllArticle();
  //     this.edit=false;
      
  //  },
  //  error: (err) => {
  //   this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
  //  }
//  })
    }
     else {
      this.validateAllFields(this.AddForm); 
  } 
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