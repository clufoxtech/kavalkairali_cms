import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { ShippingCharges } from '../../productModel/shippingCharges';
import { Weight } from '../../productModel/weight';
import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-shipping-charges',
  templateUrl: './shipping-charges.component.html',
  styleUrls: ['./shipping-charges.component.scss']
})
export class ShippingChargesComponent implements OnInit {
searchInputControl: UntypedFormControl = new UntypedFormControl();
@ViewChild('op',{static:true}) op: OverlayPanel;
addForm!: FormGroup;
editForm!: FormGroup;
addDetails: ShippingCharges;
display: boolean;
editdisplay: boolean = false;
shippingCharges: ShippingCharges[];
product: ShippingCharges;
editDetails: any;
  weights: Weight[];
  weightsToBeAdded: Weight[];
  zoneid: any;
  zoneLink: any;
  editWeights: Weight[];
//integerOnly: RegExp='^[0-9]*$';
get getControl(){
  return this.addForm.controls;
}
get getEditControl(){
  return this.editForm.controls;
}
constructor(public formBuilder: FormBuilder,public ShippingChargesservice: ProductService, private messageService: MessageService, 
  private confirmationService: ConfirmationService, private aRoute: ActivatedRoute) { }

ngOnInit(): void {
  this.product=new ShippingCharges();
  this.aRoute.params.subscribe((params) => {
    this.zoneid=params['id'];
    this.zoneLink=params['zoneLink'];
    console.log(this.zoneLink);
    localStorage.setItem('zoneLink', JSON.stringify(this.zoneLink));
    localStorage.setItem('zoneid', JSON.stringify(this.zoneid));
  });
  console.log('this.zoneLink');
this.getShippingCharges();

this.addForm = this.formBuilder.group({
  addShippingCharge: ['', [Validators.required]],
  weights:['',[Validators.required]],
});
this.editForm = this.formBuilder.group({
  editShippingCharge: ['', [Validators.required]],
  editWeight: ['', [Validators.required]],
});


}

getShippingCharges(){
this.ShippingChargesservice.getShippingCharges(this.zoneid).subscribe((response)=>{
console.log(response);
this.shippingCharges= new Array<ShippingCharges>();
if(response._embedded.zoneWeightCharges.length>0){
      
      this.shippingCharges=response._embedded.zoneWeightCharges;
      console.log(this.shippingCharges);
    }
     });
     console.log('test link');
     this.getWeights();
}
newShippingCharges(){
   
  this.display=true;
  console.log(this.weights);
}
getWeights(){
  this.ShippingChargesservice.getweight().subscribe((response)=>{
    console.log(response);
      this.weightsToBeAdded= new Array<Weight>();
      this.weightsToBeAdded=response._embedded.weights;
      if(this.shippingCharges === undefined || !this.shippingCharges.length)
      {
        console.log(this.shippingCharges);
      this.weights = this.weightsToBeAdded;
      }
      else
      {
        console.log('not empty');
        this.weights = this.weightsToBeAdded.filter(item=>!this.shippingCharges.find(x=>(x.weightId===item.id)));
      }
      console.log('out');
      console.log(this.weights);
    
    });

}
clear(table: Table) {
  table.clear();
}
addShippingCharges(){
  if (this.addForm.valid) {
    this.addDetails= new ShippingCharges();
    this.addDetails.shippingCharge=this.addForm.controls['addShippingCharge'].value;
    this.addDetails.weight=this.addForm.controls['weights'].value;
    this.addDetails.zoneId=this.zoneLink;
  this.ShippingChargesservice.addShippingCharges(this.addDetails).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.getShippingCharges();
      this.getWeights();
      this.cancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.getShippingCharges();
    this.getWeights();
    this.cancel();
   }
 });
    }
     else {
      this.validateAllFields(this.addForm);
  }
}

validateAllFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
          this.validateAllFields(control);
      }
  });
}
show(event,product){
  this.product=product;
  this.op.show(event);
}
cancel(){
  this.display=false;
  this.addForm.reset();
}
edit(product){
  this.editdisplay=true;
 this.product=new ShippingCharges();
  this.product=product;
  this.editWeights = this.weightsToBeAdded.filter(item=>!this.shippingCharges.find(x=>(x.weightId===item.id && x.weightId !== this.product.weightId)));
  console.log(this.editWeights);
  this.op.hide();
  console.log(this.product);
}
editShippingCharges(){
  console.log('estedut');
  if (this.editForm.valid) {
    console.log('estedut111');
    this.editDetails= new ShippingCharges();
    this.editDetails.id=this.product.id;
    this.editDetails.shippingCharge=this.product.shippingCharge;
    this.editDetails.weight=this.editForm.controls['editWeight'].value;
    this.editDetails.zoneId=this.zoneLink;
    console.log(this.editDetails);
  this.ShippingChargesservice.editShippingCharges(this.editDetails).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.getShippingCharges();
      this.editCancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.getShippingCharges();
    this.editCancel();
   }
 });
    }
     else {
      this.validateAllFields(this.editForm);
  }
}

editCancel(){
this.editdisplay=false;
}

delete(shippingCharges){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.ShippingChargesservice.deleteShippingCharges(shippingCharges.id).subscribe({
          next: (response)=>{
            this.getShippingCharges();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.getShippingCharges();
          }
        });
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });
}
}
