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
  selector: 'app-packing-type',
  templateUrl: './packing-type.component.html',
  styleUrls: ['./packing-type.component.scss']
})
export class PackingTypeComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public packingTypeservice :ProductService,private confirmationService: ConfirmationService) { }
public packingType:Array<any>;
public product:any;
public addDetails:any;
display: boolean = false;
AddForm!: FormGroup;
public packingTypeTitle:any;
addorEdit: boolean = false;
ngOnInit(): void {
  this.product=[];
  this.AddForm = this.formBuilder.group({
    type: ['', [Validators.required]],
    
    
  })
 
 this.GetpackingType();   
  }
  GetpackingType(){
    this.packingTypeservice.getpackingType().subscribe((response)=>{
      if(response._embedded.packageTypes.length>0){
        this.packingType= new Array<any>();
        this.packingType=response._embedded.packageTypes;
        console.log(this.packingType);
      } 
       }) 
  }
  NewpackingType(){
    this.display=true;
    this.addorEdit=false;
    this.packingTypeTitle='Add Packing Type';
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
Edit(product){
  this.display=true;
  this.addorEdit=true;
  this.packingTypeTitle='Edit Packing Type';
  this.AddForm.setValue({ type: product.type });
  this.addDetails=product;
  console.log(this.AddForm)
}
AddpackingType(){
  if (this.AddForm.valid) {
    if(!this.addorEdit){
      this.addDetails= [];
      this.addDetails.name=this.AddForm.controls['type'].value;
  this.packingTypeservice.addpackingType(this.addDetails.name).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetpackingType();
      this.Cancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetpackingType();
    this.Cancel();
   }
 })
    }
     else {
      this.addDetails.name=this.AddForm.controls['type'].value;
      this.packingTypeservice.editpackingType(this.addDetails.id,this.addDetails.name).subscribe({
        next: (response)=>{
         // if(response.sTATUS=='SUCCESS'){
           this.GetpackingType();
           this.Cancel();
        },
        error: (err) => {
         this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
         this.GetpackingType();
         this.Cancel();
        }
      })
      
  } }
  else{
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

Delete(packingType){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.packingTypeservice.deletepackingType(packingType.id).subscribe({
          next: (response)=>{
            this.GetpackingType();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetpackingType();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });
 
}
}
