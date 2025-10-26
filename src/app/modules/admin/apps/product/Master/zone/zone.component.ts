import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Country } from '../../productModel/country';
import { State } from '../../productModel/state';
import { wareHouse } from '../../productModel/wareHouse';
import { Zone } from '../../productModel/zone';
import { Router } from '@angular/router';
import { forEach } from 'lodash';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  zoneLink: any;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,
    public zoneservice:ProductService,private confirmationService: ConfirmationService, private router: Router) { }
public state:Array<State>;
public country:Array<Country>;
public product:Zone;
public addDetails:Zone;
public editDetails:Zone;
public warehouseId:number;
public selectedWarehouse:string;
display: boolean = false;
editdisplay: boolean = false;
AddForm!: FormGroup;
EditForm!: FormGroup;
public wareHouse:Array<wareHouse>;
public zone:Array<Zone>;
ngOnInit(): void {
  this.product=new Zone();
  this.EditForm = this.formBuilder.group({
    editWarehouse: ['', [Validators.required]],
    editZone: ['', [Validators.required]],
    editedd:['', [Validators.required]],
    editshippingDiscount:['', [Validators.required]],
  });
  this.AddForm = this.formBuilder.group({
    warehouse: ['', [Validators.required]],
    zone: ['', [Validators.required]],
    edd:['', [Validators.required]],
    shippingDiscount:['', [Validators.required]],
  });
   this.GetZone();
   this.GetWarehouse();
  }
  GetWarehouse(){
    this.zoneservice.getwareHouse().subscribe((response)=>{
      if(response._embedded.wareHouses.length>0){
        this.wareHouse= new Array<wareHouse>();
        this.wareHouse=response._embedded.wareHouses;
        console.log(this.wareHouse);
      }
       });
  }
  GetZone(){
    this.zoneservice.getZone().subscribe((response)=>{
      if(response._embedded.zones.length>0){
        this.zone= new Array<Zone>();
        this.zone=response._embedded.zones;
        console.log(this.zone);
      }
       });
  }
  NewState(){
this.display=true;
  }
  clear(table: Table) {
    table.clear();
}
AddZone(){
  if (this.AddForm.valid) {
    this.addDetails= new Zone();
    this.addDetails.wareHouse=this.AddForm.controls['warehouse'].value;
    this.addDetails.name=this.AddForm.controls['zone'].value;
    this.addDetails.edd=this.AddForm.controls['edd'].value;
    this.addDetails.shippingDiscount=this.AddForm.controls['shippingDiscount'].value;
  this.zoneservice.addZone(this.addDetails).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetZone();
      this.Cancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetWarehouse();
    this.Cancel();
   }
 });
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
 this.product=new Zone();
  this.product=product;
  this.warehouseId = product.wareHouseDetail.id;
  this.selectedWarehouse=product.wareHouseDetail.name;
  this.op.hide();
  console.log(this.product);
}

EditZone(){
  if (this.EditForm.valid) {
    this.editDetails= new Zone();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editZone'].value;
    console.log(this.EditForm.controls['editWarehouse']);
    this.editDetails.wareHouse=this.EditForm.controls['editWarehouse'].value;
    this.editDetails.edd=this.EditForm.controls['editedd'].value;
    this.editDetails.shippingDiscount=this.EditForm.controls['editshippingDiscount'].value;
  this.zoneservice.editZone(this.editDetails.id,this.editDetails.name, this.editDetails.wareHouse,
    this.editDetails.edd, this.editDetails.shippingDiscount
   ).subscribe({
   next: (response)=>{
    console.log(response);
    //if(response.Status==='SUCCESS'){
       this.GetZone();
      this.EditCancel();
   //}
  },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    // this.GetState();
    this.EditCancel();
   }
 });
    }
     else {
      this.validateAllFields(this.EditForm);
  }
}
EditCancel(){
this.editdisplay=false;
}
Delete(zoneitem){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.zoneservice.deleteZone(zoneitem.id).subscribe({
          next: (response)=>{
            this.GetZone();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            // this.GetState();
          }
        });
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });
}

Pincode(product){
  console.log(product);
  console.log('apps/product/Master/zone-pincode?id='+product.id);
  this.router.navigate(['apps/product/Master/zone-pincode',product]);
}
shippingCharge(product){
  console.log(product);
  const zone={
    id:product.id,
    zoneLink:product._links.self.href
  };
  this.router.navigate(['apps/product/Master/shipping-charges',zone]);
}
}
