import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ArticleList } from '../articleModel';
import { Router } from '@angular/router';

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
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,private router: Router,private confirmationService: ConfirmationService) { }
  public data =[];
  public product:ArticleList;
  AddForm!: FormGroup;
  ngOnInit(): void {
    this.user=false;
    this.AddForm = this.formBuilder.group({
      articlename: ['', [Validators.required,Validators.maxLength(50)]],
      desc: ['', [Validators.required,Validators.maxLength(100)]],
      
    }) 
    this.GetAllArticle();
   
  }
  GetAllArticle(){
    // this.userService.getAllArticles().subscribe((response)=>{
    //   this.data=response._embedded.articles;
    //    })  
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
this.edit=true;
this.op.hide();
}
EditCancel(edit:any){
this.edit=edit;
this.GetAllArticle();
}
Delete(id){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
    //   this.userService.deleteArticles(id).subscribe(
    //     {
    //       next: (response)=>{
    //         this.GetAllArticle();  
    //   },
    //   error: (err) => {
    //     this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    //    //this.Cancel();
    //   }
    //  })
       
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
});
}
AddArticle(){
  if (this.AddForm.valid) {
    this.product= new ArticleList();
    this.product.name=this.AddForm.controls['articlename'].value;
    this.product.description=this.AddForm.controls['desc'].value;
//   this.userService.addArticles(this.product.name,this.product.description).subscribe({
//     next: (response)=>{
//     // if(response.sTATUS=='SUCCESS'){
//       this.GetAllArticle();
//       this.display=false;
      
//    },
//    error: (err) => {
//     this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
//    }
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