import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Country } from '../../productModel/country';
import { State } from '../../productModel/state';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public stateservice:ProductService,private confirmationService: ConfirmationService) { }
public state:Array<State>;
public country:Array<Country>;
public product:State;
public addDetails:State;
public editDetails:State;
public selectedCountry:string;
display: boolean = false;
editdisplay: boolean = false;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new State();
  this.EditForm = this.formBuilder.group({
    editstate: ['', [Validators.required]],
    editcountry: ['', [Validators.required]],
    
  })
  this.AddForm = this.formBuilder.group({
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    
  })
   this.GetState(); 
   this.GetCountry();
  }
  GetState(){
    this.stateservice.getStates().subscribe((response)=>{
      if(response._embedded.states.length>0){
        this.state= new Array<State>();
        this.state=response._embedded.states;
        console.log(this.state);
      } 
       }) 
  }
  GetCountry(){
    this.stateservice.getCountry().subscribe((response)=>{
      if(response._embedded.countries.length>0){
        this.country= new Array<Country>();
        this.country=response._embedded.countries;
        
      } 
       }) 
  }
  NewState(){
this.display=true;
  }
  clear(table: Table) {
    table.clear();
}
AddState(){
  if (this.AddForm.valid) {
    this.addDetails= new State();
    this.addDetails.name=this.AddForm.controls['state'].value;
    this.addDetails.country=this.AddForm.controls['country'].value;
  this.stateservice.addStates(this.addDetails.name,this.addDetails.country).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetState();
      this.Cancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetState();
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
 this.product=new State();
  this.product=product;
  this.selectedCountry=this.product.country._links.self.href;
  this.op.hide();
  console.log(this.product)
}
EditState(){
  if (this.EditForm.valid) {
    this.editDetails= new State();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editstate'].value;
    this.editDetails.country=this.EditForm.controls['editcountry'].value;
  this.stateservice.editStates(this.editDetails.id,this.editDetails.name,this.editDetails.country).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetState();
      this.EditCancel();
      
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetState();
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
Delete(state){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.stateservice.deleteStates(state.id).subscribe({
          next: (response)=>{
            this.GetState();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetState();
          }
        })  
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });
  
}
}
