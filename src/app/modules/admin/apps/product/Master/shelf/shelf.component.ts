import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { shelf } from '../../productModel/shelf';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss']
})
export class ShelfComponent implements OnInit {
searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  onlyCapitals: RegExp=/[A-Z]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public shelfservice: ProductService,private confirmationService: ConfirmationService) { }
public shelf: Array<shelf>;
public product: shelf;
public addDetails: shelf;
public editDetails: shelf;
display: boolean = false;
editdisplay: boolean = false;
AddForm!: FormGroup;
EditForm!: FormGroup;
priority: any[] = [];
ngOnInit(): void {
  this.product=new shelf();
  this.AddForm = this.formBuilder.group({
    Shelf: ['', [Validators.required]],
    priority: ['', [Validators.required]],

  });
  this.EditForm = this.formBuilder.group({
    editShelf: ['', [Validators.required]],
    editPriority: ['', [Validators.required]],

  });
  this.priority = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' }  ];
 this.GetShelf();
  }


  GetShelf(){
    this.shelfservice.getShelves().subscribe((response)=>{
      if(response._embedded.shelves.length>0){
        this.shelf= new Array<shelf>();
        this.shelf=response._embedded.shelves;
      }
       });
  }
  NewShelf(){
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
AddShelf(){
  console.log(this.AddForm);
  if (this.AddForm.valid) {
    this.addDetails= new shelf();
    this.addDetails.name=this.AddForm.controls['Shelf'].value;
    this.addDetails.priority=this.AddForm.controls['priority'].value;
  this.shelfservice.addShelf(this.addDetails.name, Number(this.addDetails.priority)).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetShelf();
      this.Cancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetShelf();
    this.Cancel();
   }
 });
    }
     else {
      this.validateAllFields(this.AddForm);
  }
}
get getControl(){
  return this.AddForm.controls;
}
validateAllFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach((field) => {
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
 this.product=new shelf();
  this.product=product;
  this.op.hide();
  console.log(this.product);
}
EditShelf(){
  if (this.EditForm.valid) {
    this.editDetails= new shelf();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editShelf'].value;
    this.editDetails.priority=this.EditForm.controls['editPriority'].value;
  this.shelfservice.editShelf(this.editDetails.id,this.editDetails.name,Number(this.editDetails.priority)).subscribe({
   next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetShelf();
      this.EditCancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    this.GetShelf();
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
Delete(shelf){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
         this.shelfservice.deleteShelf(shelf.id).subscribe({
          next: (response)=>{
            this.GetShelf();
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
            this.op.hide();
            this.GetShelf();
          }
        });
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
  });

}

}
