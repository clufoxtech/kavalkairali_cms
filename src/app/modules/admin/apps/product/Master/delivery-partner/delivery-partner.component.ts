import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Country } from '../../productModel/country';
import { State } from '../../productModel/state';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-delivery-partner',
  templateUrl: './delivery-partner.component.html',
  styleUrls: ['./delivery-partner.component.scss']
})
export class DeliveryPartnerComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public deliveryservice :ProductService,private confirmationService: ConfirmationService) { }
public delivery:Array<any>;
public product:any;
public addDetails:any;
public deliveryTitle:any;
addorEdit: boolean = false;
display: boolean = false;
AddForm!: FormGroup;

ngOnInit(): void {
  this.product=[];
  this.AddForm = this.formBuilder.group({
    name: ['', [Validators.required]]
  })
 
 this.Getdelivery();   
  }
  Getdelivery(){
    this.deliveryservice.getdeliveryPartner().subscribe((response)=>{
      if(response._embedded.deliveryPartners.length>0){
        this.delivery= new Array<any>();
        this.delivery=response._embedded.deliveryPartners;
        console.log(this.delivery);
      } 
       }) 
  }
  Newdelivery(){
    this.display=true;
    this.addorEdit=false;
    this.deliveryTitle='Add Delivery';
  }
  Edit(product){
    this.display=true;
    this.addorEdit=true;
    this.deliveryTitle='Edit Delivery';
    this.AddForm.setValue({ name: product.name });
    this.addDetails=product;
    console.log(this.AddForm)
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
Adddelivery(){
  if (this.AddForm.valid) {
   
    if(!this.addorEdit){
      this.addDetails= [];
      this.addDetails.name=this.AddForm.controls['name'].value;
      this.deliveryservice.adddeliveryPartner(this.addDetails.name).subscribe({
        next: (response)=>{
         // if(response.sTATUS=='SUCCESS'){
           this.Getdelivery();
           this.Cancel();
        },
        error: (err) => {
         this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
         this.Getdelivery();
         this.Cancel();
        }
      })
    }
    else{
      this.addDetails.name=this.AddForm.controls['name'].value;
      this.deliveryservice.editdeliveryPartner(this.addDetails.id,this.addDetails.name).subscribe({
        next: (response)=>{
         // if(response.sTATUS=='SUCCESS'){
           this.Getdelivery();
           this.Cancel();
        },
        error: (err) => {
         this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
         this.Getdelivery();
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

Delete(delivery){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.deliveryservice.deletedeliveryPartner(delivery.id).subscribe({
          next: (response)=>{
            this.Getdelivery();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.Getdelivery();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });
 
}
}
