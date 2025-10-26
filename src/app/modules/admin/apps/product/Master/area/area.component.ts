import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Area } from '../../productModel/area';
import { Country } from '../../productModel/country';
import { LCity } from '../../productModel/LCity';
import { Pincode } from '../../productModel/pincode';
import { State } from '../../productModel/state';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public areaservice:ProductService,private confirmationService: ConfirmationService) { }
public area:Array<Area>;
public city:Array<LCity>;
public state:Array<State>;
public country:Array<Country>;
public pincode:Array<Pincode>;
public product:Area;
public addDetails:Area;
public editDetails:Area;
public selectedCountry:Country;
public Countryid:number;
public selectedState:State;
public Stateid:number;
public selectedCity:string;
public selectedPincode:string;
display: boolean = false;
editdisplay: boolean = false;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new Area();
  this.EditForm = this.formBuilder.group({
    editstate: ['', [Validators.required]],
    editcountry: ['', [Validators.required]],
    editcity:['', [Validators.required]],
    editpincode:['', [Validators.required]],
    editarea:['', [Validators.required]],
  })
  this.AddForm = this.formBuilder.group({
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    pincode: ['', [Validators.required]],
    area: ['', [Validators.required]],
  })
   this.GetArea();
   this.GetCountry();
  }
  GetArea(){
    this.areaservice.getArea().subscribe((response)=>{
      if(response._embedded.areas.length>0){
        this.area= new Array<Area>();
        this.area=response._embedded.areas;
        console.log(this.area);
      } 
       }) 
  }
  GetPincode(){
    this.areaservice.getPincode().subscribe((response)=>{
      if(response._embedded.pincodes.length>0){
        this.pincode= new Array<Pincode>();
        this.pincode=response._embedded.pincodes;
        console.log(this.pincode);
      } 
       }) 
  }
  GetStateByCountry(event:any){
    var country:Country=JSON.parse(event.target.value);
    var id=country.id;
    this.areaservice.getStatesByCountry(id).subscribe((response)=>{
        this.state= new Array<State>();
        this.state=response._embedded.states;
        console.log(this.state);
     
       }) 
       this.selectedState = new State();
       this.selectedCity='';
       this.selectedPincode='';
  }
  GetCountry(){
    this.areaservice.getCountry().subscribe((response)=>{
      if(response._embedded.countries.length>0){
        this.country= new Array<Country>();
        this.country=response._embedded.countries;
        
      } 
       }) 
  }
  GetCityByState(event){
    var state:State=JSON.parse(event.target.value);
    var id=state.id;
    this.areaservice.getCityByState(id).subscribe((response)=>{
      if(response._embedded.cities.length>0){
        this.city= new Array<LCity>();
        this.city=response._embedded.cities;
        console.log(this.city);
      } 
       }) 
       this.GetPincode();
       this.selectedCity='';
       this.selectedPincode='';
  }
  NewArea(){
this.display=true;
  }
  clear(table: Table) {
    table.clear();
}
AddArea(){
  if (this.AddForm.valid) {
    this.addDetails= new Area();
    this.addDetails.name=this.AddForm.controls['area'].value;
    this.addDetails.pincode=this.AddForm.controls['pincode'].value;
    this.addDetails.city=this.AddForm.controls['city'].value;
  this.areaservice.addArea(this.addDetails.name,this.addDetails.pincode,this.addDetails.city).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetArea();
      this.Cancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetArea();
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
 this.product=new Area();
  this.product=product;
  this.Countryid=product.city.state.country.id;
  this.selectedCountry=product.city.state.country;
  this.areaservice.getStatesByCountry(this.Countryid).subscribe((response)=>{
    this.state= new Array<State>();
    this.state=response._embedded.states;
   }) 
  this.Stateid=product.city.state.id;
  this.selectedState=product.city.state;
  this.areaservice.getCityByState(this.Stateid).subscribe((response)=>{
    if(response._embedded.cities.length>0){
      this.city= new Array<LCity>();
      this.city=response._embedded.cities;
    } 
     }) 
  this.selectedCity=product.city._links.self.href;
  this.selectedPincode=product.pincode._links.self.href; 
  this.GetPincode();
  this.op.hide();
  console.log(this.product)
}
EditArea(){
  if (this.EditForm.valid) {
    this.editDetails= new Area();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editarea'].value;
    this.editDetails.city=this.EditForm.controls['editcity'].value;
    this.editDetails.pincode=this.EditForm.controls['editpincode'].value;
  this.areaservice.editArea(this.editDetails.id,this.editDetails.name,this.editDetails.city,this.editDetails.pincode).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetArea();
      this.EditCancel();
    
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetArea();
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
Delete(area){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
          this.areaservice.deleteArea(area.id).subscribe({
          next: (response)=>{
            this.GetArea();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetArea();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
});
  
 }
}
