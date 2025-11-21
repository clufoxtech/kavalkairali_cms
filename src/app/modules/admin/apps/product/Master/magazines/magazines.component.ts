import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Magazine } from '../../productModel/magazine';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-magazines',
  templateUrl: './magazines.component.html',
  styleUrls: ['./magazines.component.scss']
})
export class MagazinesComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public magazineservice:ProductService,private confirmationService: ConfirmationService) { }
public magazine:Array<Magazine>;
public product:Magazine;
public addDetails:Magazine;
public editDetails:Magazine;
public editMagazineName:any;
display: boolean = false;
editdisplay:boolean=false;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new Magazine();
  this.AddForm = this.formBuilder.group({
    magazine: ['', [Validators.required]],
  
    
  })
  this.EditForm = this.formBuilder.group({
    editmagazine: ['', [Validators.required]],
  
    
  })
  this.GetMagazine();  
  }
  GetMagazine(){
    this.magazineservice.getMagazines().subscribe((response)=>{
      if(response._embedded.magazines.length>0){
        this.magazine= new Array<Magazine>();
        this.magazine=response._embedded.magazines
        console.log(this.magazine);
      } 
       }) 
  }
  NewCondition(){
this.display=true;
  }
  clear(table: Table) {
    table.clear();
}
AddMagazine(){
  if (this.AddForm.valid) {
    this.addDetails= new Magazine();
    this.addDetails.name=this.AddForm.controls['magazine'].value;
  this.magazineservice.addMagazine(this.addDetails.name).subscribe({
   next: (response)=>{
      this.GetMagazine();
      this.Cancel();
     
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.Cancel();
    this.GetMagazine();
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
 this.product=new Magazine();
  this.product=product;
  this.editMagazineName=product.name;
  this.op.hide();
  console.log(this.product);
}
EditMagazine(){
  if (this.EditForm.valid) {
    this.editDetails= new Magazine();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editmagazine'].value;
  this.magazineservice.editMagazine(this.editDetails.id,this.editDetails.name).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetMagazine();
      this.EditCancel();
      
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.EditCancel();
    this.GetMagazine();
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
Delete(magazine){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.magazineservice.deleteMagazine(magazine.id).subscribe({
          next: (response)=>{
            this.GetMagazine();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetMagazine();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });
 
}
}
