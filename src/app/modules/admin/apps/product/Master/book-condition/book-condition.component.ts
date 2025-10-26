import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Condition } from '../../productModel/Condition';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-book-condition',
  templateUrl: './book-condition.component.html',
  styleUrls: ['./book-condition.component.scss']
})
export class BookConditionComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  display: boolean = false;
  editdisplay:boolean=false;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService, public conditionservice:ProductService,private confirmationService: ConfirmationService) { }
public condition:Array<Condition>;
public product:Condition;
public addDetails:Condition;
public editDetails:Condition;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new Condition();
  this.AddForm = this.formBuilder.group({
    condition: ['', [Validators.required]],
    
  }) 
  this.EditForm = this.formBuilder.group({
    editcondition: ['', [Validators.required]],
    
  }) 
   this.GetCondition();
  }
  GetCondition(){
    this.conditionservice.getCondition().subscribe((response)=>{
      if(response._embedded.bookConditions.length>0){
        this.condition= new Array<Condition>();
        this.condition=response._embedded.bookConditions;
        console.log(this.condition);
      } 
       }) 
  }
  NewCondition(){
    this.display=true;
  }
  clear(table: Table) {
    table.clear();
}
show(event,product){
  this.product=product;
  this.op.show(event);
}
Cancel(){
  this.display=false;
  this.AddForm.reset();
}
AddCondition(){
  if (this.AddForm.valid) {
    this.addDetails= new Condition();
    this.addDetails.name=this.AddForm.controls['condition'].value;
  this.conditionservice.addCondition(this.addDetails.name).subscribe({
   next: (response)=>{

      this.GetCondition();
      this.Cancel();
      
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetCondition();
    this.Cancel();
   }
 })
    }
     else {
      this.validateAllFields(this.AddForm); 
  }   
}
get getControl(){
  return this.AddForm.controls;
}
get geteditControl(){
  return this.EditForm.controls;
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
Edit(product){
  this.editdisplay=true;
 // this.product=new Contributor();
  this.product=product;
  this.op.hide();
  console.log(this.product)
}
EditCondition(){
  if (this.EditForm.valid) {
    this.editDetails= new Condition();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editcondition'].value;
  this.conditionservice.editImprint(this.editDetails.id,this.editDetails.name).subscribe({
   next: (response)=>{
    
      this.GetCondition();
      this.EditCancel();
     
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetCondition();
    this.EditCancel();
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
Delete(condition){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.conditionservice.deleteCondition(condition.id).subscribe({
          next: (response)=>{
            this.GetCondition();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetCondition();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
});
  
}
}
