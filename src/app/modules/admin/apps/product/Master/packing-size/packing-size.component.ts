import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Country } from '../../productModel/country';
import { State } from '../../productModel/state';
import { Language } from '../../productModel/language';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-packing-size',
  templateUrl: './packing-size.component.html',
  styleUrls: ['./packing-size.component.scss']
})
export class PackingSizeComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public packingSizeservice :ProductService,private confirmationService: ConfirmationService) { }
public packingSize:Array<any>;
public product:any;
public addDetails:any;
display: boolean = false;
AddForm!: FormGroup;
public packingTitle:any;
addorEdit: boolean = false;
ngOnInit(): void {
  this.product=[];
  this.AddForm = this.formBuilder.group({
    size: ['', [Validators.required]], 
  })
 
 this.GetpackingSize();   
  }
  GetpackingSize(){
    this.packingSizeservice.getpackingSize().subscribe((response)=>{
      // if(response._embedded.packageSizes.length>0){
        this.packingSize= new Array<any>();
        this.packingSize=response._embedded.packageSizes;
        console.log(this.packingSize);
      // } 
       }) 
  }
  Edit(product){
    this.display=true;
    this.addorEdit=true;
    this.packingTitle='Edit Packing';
    this.AddForm.setValue({ size: product.size });
    this.addDetails=product;
    console.log(this.AddForm)
  }
  NewpackingSize(){
    this.display=true;
    this.addorEdit=false;
    this.packingTitle='Add Packing';
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
AddpackingSize(){
  if (this.AddForm.valid) {
   
    if(!this.addorEdit){
      this.addDetails= [];
      this.addDetails.size=this.AddForm.controls['size'].value;
  this.packingSizeservice.addpackingSize(this.addDetails.size).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetpackingSize();
      this.Cancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetpackingSize();
    this.Cancel();
   }
 })
}
else{
  this.addDetails.size=this.AddForm.controls['size'].value;
  this.packingSizeservice.editpackingSize(this.addDetails.id,this.addDetails.size).subscribe({
    next: (response)=>{
     // if(response.sTATUS=='SUCCESS'){
       this.GetpackingSize();
       this.Cancel();
    },
    error: (err) => {
     this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
     this.GetpackingSize();
     this.Cancel();
    }
  })
}
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

Delete(packingSize){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.packingSizeservice.deletepackingSize(packingSize.id).subscribe({
          next: (response)=>{
            this.GetpackingSize();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetpackingSize();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });
 
}
}
