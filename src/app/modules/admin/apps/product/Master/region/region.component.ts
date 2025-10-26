import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { LCity } from '../../productModel/LCity';
import { Country } from '../../productModel/country';
import { State } from '../../productModel/state';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public cityservice:ProductService,private confirmationService: ConfirmationService) { }
public city:Array<LCity>;
public state:Array<State>;
public country:Array<Country>;
public product:LCity;
public addDetails:LCity;
public editDetails:LCity;
public selectedState:string;
public selectedCountry:Country;
display: boolean = false;
editdisplay: boolean = false;
Countryid:number;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new LCity();
  this.EditForm = this.formBuilder.group({
    editstate: ['', [Validators.required]],
    editcountry: ['', [Validators.required]],
    editcity:['', [Validators.required]]
    
  })
  this.AddForm = this.formBuilder.group({
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
  })
  this.GetCountry();
  this.GetCity();  
  }
  GetCity(){
    this.cityservice.getCity().subscribe((response)=>{
      if(response._embedded.cities.length>0){
        this.city= new Array<LCity>();
        this.city=response._embedded.cities;
        console.log(this.city);
      } 
       }) 
  }
  GetStateByCountry(event:any){
    var country:Country=JSON.parse(event.target.value);
    var id=country.id;
    this.cityservice.getStatesByCountry(id).subscribe((response)=>{
        this.state= new Array<State>();
        this.state=response._embedded.states;
        console.log(this.state);
     
       }) 
       this.selectedState='';
  }
  GetCountry(){
    this.cityservice.getCountry().subscribe((response)=>{
      if(response._embedded.countries.length>0){
        this.country= new Array<Country>();
        this.country=response._embedded.countries;
        
      } 
       }) 
  }
  NewCity(){
this.display=true;
  }
  clear(table: Table) {
    table.clear();
}
AddCity(){
  if (this.AddForm.valid) {
    this.addDetails= new LCity();
    this.addDetails.name=this.AddForm.controls['city'].value;
    this.addDetails.state=this.AddForm.controls['state'].value;
  this.cityservice.addCity(this.addDetails.name,this.addDetails.state).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetCity();
      this.Cancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetCity();
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
 this.product=new LCity();
  this.product=product;
  this.Countryid=product.state.country.id;
  this.selectedCountry=product.state.country;
  this.selectedState=product.state._links.self.href;
  this.cityservice.getStatesByCountry(this.Countryid).subscribe((response)=>{
    this.state= new Array<State>();
    this.state=response._embedded.states;
    console.log(this.state);

   })
  
  this.op.hide();
  console.log(this.product)
}
EditCity(){
  if (this.EditForm.valid) {
    this.editDetails= new LCity();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editcity'].value;
    this.editDetails.state=this.EditForm.controls['editstate'].value;
  this.cityservice.editCity(this.editDetails.id,this.editDetails.name,this.editDetails.state).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetCity();
      this.EditCancel();   
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetCity();
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

Delete(city){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.cityservice.deleteCity(city.id).subscribe({
          next: (response)=>{
            this.GetCity();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetCity();
          }
        })
   
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
});
  
}

}
