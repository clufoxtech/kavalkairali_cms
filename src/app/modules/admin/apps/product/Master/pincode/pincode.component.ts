import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Pincode } from '../../productModel/pincode';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.scss']
})
export class PincodeComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  zone: Zone[];
  zoneId: any;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService, public pincodeservice:ProductService,private confirmationService: ConfirmationService) { }
public pincode:Array<Pincode>;
public product:Pincode;
public addDetails:Pincode;
public editDetails:Pincode;
display: boolean = false;
editdisplay: boolean = false;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new Pincode();
  this.EditForm = this.formBuilder.group({
    editpincode:['', [Validators.required]],
    editzone: ['', [Validators.required]],
    
  })
  this.AddForm = this.formBuilder.group({
    pincode: ['', [Validators.required]],
    zone: ['', [Validators.required]],
  })
   this.GetPincode();
   this.GetZone();
  }
  GetPincode(){
    this.pincodeservice.getPincode().subscribe((response)=>{
      if(response._embedded.pincodes.length>0){
        this.pincode= new Array<Pincode>();
        this.pincode=response._embedded.pincodes;
        console.log(this.pincode);
      } 
       }) 
  }
  GetZone(){
      this.pincodeservice.getZone().subscribe((response)=>{
        if(response._embedded.zones.length>0){
          this.zone= new Array<Zone>();
          this.zone=response._embedded.zones;
          console.log(this.zone);
        }
         });
    }
  NewPincode(){
this.display=true;
  }
  clear(table: Table) {
    table.clear();
}
AddPincode(){
  if (this.AddForm.valid) {
    this.addDetails= new Pincode();
    this.addDetails.name=this.AddForm.controls['pincode'].value;
    //this.addDetails.category=this.AddForm.controls['category'].value;
  this.pincodeservice.addPincode(this.addDetails.name).subscribe({
   next: (response)=>{
      this.GetPincode();
      this.Cancel();
      
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetPincode();
      this.Cancel();
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
 this.product=new Pincode();
  this.product=product;
  this.zoneId = product.id;
  this.op.hide();
  console.log(this.product)
}
EditPincode(){
  if (this.EditForm.valid) {
    this.editDetails= new Pincode();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editpincode'].value;
    //this.editDetails.state=this.EditForm.controls['editstate'].value;
  this.pincodeservice.editPincode(this.editDetails.id,this.editDetails.name).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetPincode();
      this.EditCancel();
       
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetPincode();
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
Delete(pincode){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.pincodeservice.deletePincode(pincode.id).subscribe({
          next: (response)=>{
            this.GetPincode();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetPincode();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });
  
}
}
