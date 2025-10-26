import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Country } from '../../productModel/country';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public countryservice:ProductService,private confirmationService: ConfirmationService) { }
public country:Array<Country>;
public product:Country;
public addDetails:Country;
public editDetails:Country;
display: boolean = false;
editdisplay: boolean = false;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new Country();
  this.AddForm = this.formBuilder.group({
    country: ['', [Validators.required]],
    
    
  })
  this.EditForm = this.formBuilder.group({
    editcountry: ['', [Validators.required]],
    
    
  })
   this.GetCountry(); 
  }
  GetCountry(){
    this.countryservice.getCountry().subscribe((response)=>{
      if(response._embedded.countries.length>0){
        this.country= new Array<Country>();
        this.country=response._embedded.countries;
        console.log(this.country);
      } 
       }) 
  }
  NewCountry(){
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
AddCountry(){
  if (this.AddForm.valid) {
    this.addDetails= new Country();
    this.addDetails.name=this.AddForm.controls['country'].value;
  this.countryservice.addCountry(this.addDetails.name).subscribe({
   next: (response)=>{
      this.GetCountry();
      this.Cancel();
     
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetCountry();
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
  this.product=new Country();
  this.product=product;
  this.op.hide();
  console.log(this.product)
}
EditCountry(){
  if (this.EditForm.valid) {
    this.editDetails= new Country();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editcountry'].value;
  this.countryservice.editCountry(this.editDetails.id,this.editDetails.name).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetCountry();
      this.EditCancel();
       
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetCountry();
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
Delete(country){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.countryservice.deleteCountry(country.id).subscribe({
          next: (response)=>{
            this.GetCountry();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetCountry();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
});
 
}
}
