import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Category } from '../../productModel/Category';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public categoryservice:ProductService,private confirmationService: ConfirmationService) { }
public category:Array<Category>;
public product:Category;
public addDetails:Category;
public editDetails:Category;
public editCategoryName:any;
display: boolean = false;
editdisplay:boolean=false;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new Category();
  this.AddForm = this.formBuilder.group({
    category: ['', [Validators.required]],
  
    
  })
  this.EditForm = this.formBuilder.group({
    editcategory: ['', [Validators.required]],
  
    
  })
  this.GetCategory();  
  }
  GetCategory(){
    this.categoryservice.getCategory().subscribe((response)=>{
      if(response._embedded.magazineCategories.length>0){
        this.category= new Array<Category>();
        this.category=response._embedded.magazineCategories;
        console.log(this.category);
      } 
       }) 
  }
  NewCondition(){
this.display=true;
  }
  clear(table: Table) {
    table.clear();
}
AddCategory(){
  if (this.AddForm.valid) {
    this.addDetails= new Category();
    this.addDetails.name=this.AddForm.controls['category'].value;
  this.categoryservice.addCategory(this.addDetails.name).subscribe({
   next: (response)=>{
      this.GetCategory();
      this.Cancel();
     
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.Cancel();
    this.GetCategory();
   }
 })
    }
     else {
      this.validateAllFields(this.AddForm); 
  } 
 
}
show(event,product){
  this.product=product;
  this.op.show(event);
}
Cancel(){
  this.display=false;
  this.AddForm.reset(); 
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
get getEditControl(){
  return this.EditForm.controls;
}
Edit(product){
  this.editdisplay=true;
 this.product=new Category();
  this.product=product;
  this.editCategoryName=product.name;
  this.op.hide();
  console.log(this.product);
}
EditCategory(){
  if (this.EditForm.valid) {
    this.editDetails= new Category();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editcategory'].value;
  this.categoryservice.editCategory(this.editDetails.id,this.editDetails.name).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetCategory();
      this.EditCancel();
      
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.EditCancel();
    this.GetCategory();
   }
 })
    }
     else {
      this.validateAllFields(this.EditForm); 
  } 
 
}
EditCancel(){
  this.EditForm.reset(); 
this.editdisplay=false;

}
Delete(category){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.categoryservice.deleteCategory(category.id).subscribe({
          next: (response)=>{
            this.GetCategory();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetCategory();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });
 
}
}
