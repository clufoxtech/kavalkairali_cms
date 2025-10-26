import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { BindingType } from '../../productModel/BindingType';
import { Country } from '../../productModel/country';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-bindingtype',
  templateUrl: './bindingtype.component.html',
  styleUrls: ['./bindingtype.component.scss']
})
export class BindingtypeComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public BindingTypeservice:ProductService,private confirmationService: ConfirmationService) { }
public BindingType:Array<BindingType>;
public product:BindingType;
public addDetails:BindingType;
public editDetails:BindingType;
display: boolean = false;
editdisplay: boolean = false;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new BindingType();
  this.AddForm = this.formBuilder.group({
    BindingType: ['', [Validators.required]],
    
    
  })
  this.EditForm = this.formBuilder.group({
    editBindingType: ['', [Validators.required]],
    
    
  })
   this.GetBindingType(); 
  }
  GetBindingType(){
    this.BindingTypeservice.getBindingType().subscribe((response)=>{
      if(response._embedded.bookBindingTypes.length>0){
        this.BindingType= new Array<BindingType>();
        this.BindingType=response._embedded.bookBindingTypes;
        console.log(this.BindingType);
      } 
       }) 
  }
  NewBindingType(){
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
AddBindingType(){
  if (this.AddForm.valid) {
    this.addDetails= new BindingType();
    this.addDetails.type=this.AddForm.controls['BindingType'].value;
  this.BindingTypeservice.addBindingType(this.addDetails.type).subscribe({
   next: (response)=>{
      this.GetBindingType();
      this.Cancel();
     
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetBindingType();
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
  this.product=new BindingType();
  this.product=product;
  this.op.hide();
  console.log(this.product)
}
EditBindingType(){
  if (this.EditForm.valid) {
    this.editDetails= new BindingType();
    this.editDetails.id=this.product.id;
    this.editDetails.type=this.EditForm.controls['editBindingType'].value;
  this.BindingTypeservice.editBindingType(this.editDetails.id,this.editDetails.type).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetBindingType();
      this.EditCancel();
       
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetBindingType();
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
Delete(type){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.BindingTypeservice.deleteBindingType(type.id).subscribe({
          next: (response)=>{
            this.GetBindingType();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetBindingType();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
});
 
}

}
