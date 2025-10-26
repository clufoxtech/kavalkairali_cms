import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Category } from '../../productModel/Category';
import { SubCategory } from '../../productModel/SubCategory';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-product-subcategory',
  templateUrl: './product-subcategory.component.html',
  styleUrls: ['./product-subcategory.component.scss']
})
export class ProductSubcategoryComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public subcategoryservice:ProductService,private confirmationService: ConfirmationService) { }
public subcategory:Array<SubCategory>;
public product:SubCategory;
public category:Array<Category>;
public addDetails:SubCategory;
public editDetails:SubCategory;
public selectedCategory:string;
display: boolean = false;
editdisplay: boolean = false;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new SubCategory();
  this.EditForm = this.formBuilder.group({
    editsubcategory: ['', [Validators.required]],
    editcategory: ['', [Validators.required]],
    
  })
  this.AddForm = this.formBuilder.group({
    subcategory: ['', [Validators.required]],
    category: ['', [Validators.required]],
    
  })
  this.GetSubcategory();
  this.GetCategory();
  }
  GetSubcategory(){
    this.subcategoryservice.getSubcategory().subscribe((response)=>{
      //if(response.length>0){
        this.subcategory= new Array<SubCategory>();
        this.subcategory=response._embedded.subCategories;
        console.log(this.subcategory);
      //} 
       }) 
  }
  GetCategory(){
    this.subcategoryservice.getCategory().subscribe((response)=>{
      if(response._embedded.categoryModels.length>0){
        this.category= new Array<Category>();
        this.category=response._embedded.categoryModels;
        
      } 
       }) 
  }
  NewCondition(){
this.display=true;
  }
  clear(table: Table) {
    table.clear();
}
AddSubcategory(){
  if (this.AddForm.valid) {
    this.addDetails= new SubCategory();
    this.addDetails.name=this.AddForm.controls['subcategory'].value;
    this.addDetails.category=this.AddForm.controls['category'].value;
  this.subcategoryservice.addSubcategory(this.addDetails.name,this.addDetails.category).subscribe({
   next: (response)=>{
    
      this.GetSubcategory();
      this.Cancel();
       
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.Cancel();
    this.GetSubcategory();
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
 this.product=new SubCategory();
  this.product=product;
  this.selectedCategory=product.categoryData._links.self.href;
  this.op.hide();
  console.log(this.product)
}
EditSubCategory(){
  if (this.EditForm.valid) {
    this.editDetails= new SubCategory();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editsubcategory'].value;
    this.editDetails.category=this.EditForm.controls['editcategory'].value;
  this.subcategoryservice.editSubcategory(this.editDetails.id,this.editDetails.name,this.editDetails.category).subscribe({
   next: (response)=>{
      this.GetSubcategory();
      this.EditCancel();
      
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.EditCancel();
    this.GetSubcategory();
   }
 })
    }
     else {
      this.validateAllFields(this.EditForm); 
  } 
}
EditCancel(){
this.editdisplay=false;

}
Delete(subcategory){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.subcategoryservice.deleteSubcategory(subcategory.id).subscribe({
          next: (response)=>{
            this.GetSubcategory();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetSubcategory();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });
 
 
}
}
