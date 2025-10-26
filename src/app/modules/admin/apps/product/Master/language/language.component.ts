import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Language } from '../../productModel/language';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public languageservice :ProductService,private confirmationService: ConfirmationService) { }
public language:Array<Language>;
public product:Language;
public addDetails:Language;
public editDetails:Language;
display: boolean = false;
editdisplay: boolean = false;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new Language();
  this.AddForm = this.formBuilder.group({
    language: ['', [Validators.required]],
    
    
  })
  this.EditForm = this.formBuilder.group({
    editlanguage: ['', [Validators.required]],
    
    
  })
 this.Getlanguage();   
  }
  Getlanguage(){
    this.languageservice.getLanguage().subscribe((response)=>{
      if(response._embedded.languages.length>0){
        this.language= new Array<Language>();
        this.language=response._embedded.languages;
        console.log(this.language);
      } 
       }) 
  }
  Newlanguage(){
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
Addlanguage(){
  if (this.AddForm.valid) {
    this.addDetails= new Language();
    this.addDetails.name=this.AddForm.controls['language'].value;
  this.languageservice.addLanguage(this.addDetails.name).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.Getlanguage();
      this.Cancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.Getlanguage();
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
 this.product=new Language();
  this.product=product;
  this.op.hide();
  console.log(this.product)
}
Editlanguage(){
  if (this.EditForm.valid) {
    this.editDetails= new Language();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editlanguage'].value;
  this.languageservice.editLanguage(this.editDetails.id,this.editDetails.name).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.Getlanguage();
      this.EditCancel();
      
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.Getlanguage();
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
Delete(language){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.languageservice.deleteLanguage(language.id).subscribe({
          next: (response)=>{
            this.Getlanguage();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.Getlanguage();
          }
        })
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });
 
}

}
