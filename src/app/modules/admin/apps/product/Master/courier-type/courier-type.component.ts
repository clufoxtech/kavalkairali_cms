import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Language } from '../../productModel/language';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-courier-type',
  templateUrl: './courier-type.component.html',
  styleUrls: ['./courier-type.component.scss']
})
export class CourierTypeComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public courierservice :ProductService,private confirmationService: ConfirmationService) { }
public courier:Array<any>;
public product:any;
public addDetails:any;
display: boolean = false;
AddForm!: FormGroup;
public courierTitle:any;
addorEdit: boolean = false;
ngOnInit(): void {
  this.product=[];
  this.AddForm = this.formBuilder.group({
    type: ['', [Validators.required]],
  })
 
 this.Getcourier();   
  }
  Getcourier(){
    this.courierservice.getCourier().subscribe((response)=>{
      if(response._embedded.courierTypes.length>0){
        this.courier= new Array<any>();
        this.courier=response._embedded.courierTypes;
        console.log(this.courier);
      } 
       }) 
  }
  Newcourier(){
    this.display=true;
    this.addorEdit=false;
    this.courierTitle='Add Courier';
  }
  Edit(product)
  {
    this.display=true;
    this.addorEdit=true;
    this.AddForm.setValue({ type: product.type });
    this.addDetails=product;
    this.courierTitle='Add Courier';
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
Addcourier(){
  if (this.AddForm.valid) {
   
    if(!this.addorEdit){
      this.addDetails= [];
    this.addDetails.name=this.AddForm.controls['type'].value;
  this.courierservice.addCourier(this.addDetails.name).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.Getcourier();
      this.Cancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.Getcourier();
    this.Cancel();
   }
 })
    } else{
      this.addDetails.name=this.AddForm.controls['type'].value;
      this.courierservice.editCourier(this.addDetails.id,this.addDetails.name).subscribe({
        next: (response)=>{
         // if(response.sTATUS=='SUCCESS'){
           this.Getcourier();
           this.Cancel();
        },
        error: (err) => {
         this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
         this.Getcourier();
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

Delete(courier){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.courierservice.deleteCourier(courier.id).subscribe({
          next: (response)=>{
            this.Getcourier();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.Getcourier();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });
 
}
}
