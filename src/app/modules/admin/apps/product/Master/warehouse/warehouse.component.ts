import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { wareHouse } from '../../productModel/wareHouse';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  onlyCapitals:RegExp=/[A-Z]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public wareHouseservice :ProductService,private confirmationService: ConfirmationService) { }
public wareHouse:Array<wareHouse>;
public product:wareHouse;
public addDetails:wareHouse;
public editDetails:wareHouse;
display: boolean = false;
editdisplay: boolean = false;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new wareHouse();
  this.AddForm = this.formBuilder.group({
    Warehouse: ['', [Validators.required]],
    code: ['', [Validators.required]],
    
  })
  this.EditForm = this.formBuilder.group({
    editWarehouse: ['', [Validators.required]],
    editCode: ['', [Validators.required]],
    
  })
 this.GetWarehouse();   
  }
  GetWarehouse(){
    this.wareHouseservice.getwareHouse().subscribe((response)=>{
      if(response._embedded.wareHouses.length>0){
        this.wareHouse= new Array<wareHouse>();
        this.wareHouse=response._embedded.wareHouses;
        console.log(this.wareHouse);
      } 
       }) 
  }
  NewWarehouse(){
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
AddWarehouse(){
  if (this.AddForm.valid) {
    this.addDetails= new wareHouse();
    this.addDetails.name=this.AddForm.controls['Warehouse'].value;
    this.addDetails.code=this.AddForm.controls['code'].value;
  this.wareHouseservice.addwareHouse(this.addDetails).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetWarehouse();
      this.Cancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetWarehouse();
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
 this.product=new wareHouse();
  this.product=product;
  this.op.hide();
  console.log(this.product);
}
EditWarehouse(){
  if (this.EditForm.valid) {
    this.editDetails= new wareHouse();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editWarehouse'].value;
    this.editDetails.code=this.EditForm.controls['editCode'].value;
  this.wareHouseservice.editwareHouse(this.editDetails.id,this.editDetails).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetWarehouse();
      this.EditCancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetWarehouse();
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
Delete(wareHouse){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.wareHouseservice.deletewareHouse(wareHouse.id).subscribe({
          next: (response)=>{
            this.GetWarehouse();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetWarehouse();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });
 
}

}
