import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Imprint } from '../../productModel/Imprint';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public imprintservice :ProductService,private confirmationService: ConfirmationService) { }
public imprint:Array<Imprint>;
public product:Imprint;
public addDetails:Imprint;
public editDetails:Imprint;
display: boolean = false;
editdisplay: boolean = false;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new Imprint();
  this.AddForm = this.formBuilder.group({
    imprint: ['', [Validators.required]],
    
    
  })
  this.EditForm = this.formBuilder.group({
    editimprint: ['', [Validators.required]],
    
    
  })
 this.GetImprint();   
  }
  GetImprint(){
    this.imprintservice.getImprint().subscribe((response)=>{
      if(response._embedded.imprints.length>0){
        this.imprint= new Array<Imprint>();
        this.imprint=response._embedded.imprints;
        console.log(this.imprint);
      } 
       }) 
  }
  NewImprint(){
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
AddImprint(){
  if (this.AddForm.valid) {
    this.addDetails= new Imprint();
    this.addDetails.name=this.AddForm.controls['imprint'].value;
  this.imprintservice.addImprint(this.addDetails.name).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetImprint();
      this.Cancel();
      
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetImprint();
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
 this.product=new Imprint();
  this.product=product;
  this.op.hide();
  console.log(this.product)
}
EditImprint(){
  if (this.EditForm.valid) {
    this.editDetails= new Imprint();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editimprint'].value;
  this.imprintservice.editImprint(this.editDetails.id,this.editDetails.name).subscribe({
   next: (response)=>{
    
      this.GetImprint();
      this.EditCancel();
      
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetImprint();
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
Delete(imprint){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.imprintservice.deleteImprint(imprint.id).subscribe({
          next: (response)=>{
            this.GetImprint();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetImprint();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
});
  
}
}
