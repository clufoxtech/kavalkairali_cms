import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Publisher } from '../../productModel/Publisher';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public publisherservice : ProductService,private confirmationService: ConfirmationService) { }
public product:Publisher;
public publisher:Array<Publisher>;
public editDetails:Publisher;
public addDetails:Publisher;
display: boolean = false;
editdisplay: boolean = false;
AddForm!: FormGroup;
EditForm!: FormGroup;
ngOnInit(): void {
  this.product=new Publisher();
  this.AddForm = this.formBuilder.group({
    publisher: ['', [Validators.required]],
    
    
  })
  this.EditForm = this.formBuilder.group({
    editpublisher: ['', [Validators.required]],
    
    
  })
   this.GetPublisher();
  }
  GetPublisher(){
    this.publisherservice.getPublisher().subscribe((response)=>{
      if(response._embedded.publishers.length>0){
        this.publisher= new Array<Publisher>();
        this.publisher=response._embedded.publishers;
        console.log(this.publisher);
      } 
       }) 
  }
  NewPublisher(){
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
  this.AddForm.reset();
  this.display=false;;
}
AddPublisher(){
  if (this.AddForm.valid) {
    this.addDetails= new Publisher();
    this.addDetails.name=this.AddForm.controls['publisher'].value;
  this.publisherservice.addPublisher(this.addDetails.name).subscribe({
   next: (response)=>{
      this.GetPublisher();
      this.Cancel();
      
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetPublisher();
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
get geteditControl(){
  return this.EditForm.controls;
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
Edit(product){
  this.editdisplay=true;
  this.product=new Publisher();
  this.product=product;
  this.op.hide();
}
EditPublisher(){
  if (this.EditForm.valid) {
    this.editDetails= new Publisher();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editpublisher'].value;
  this.publisherservice.editPublisher(this.editDetails.id,this.editDetails.name).subscribe({
   next: (response)=>{
    
      this.GetPublisher();
      this.EditCancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetPublisher();
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
Delete(publisher){
  this.confirmationService.confirm({
  message: 'Do you want to delete this record?',
  header: 'Delete Confirmation',
  icon: 'pi pi-info-circle',
  accept: () => {
    this.publisherservice.deletePublisher(publisher.id).subscribe({
      next: (response)=>{
        this.GetPublisher();
      },
      error: (err) => {
        this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
        this.op.hide();
        this.GetPublisher();
      }
    })
    
  },
  reject: () => {
    //Actual logic to perform a confirmation
}
});
  
}
}
