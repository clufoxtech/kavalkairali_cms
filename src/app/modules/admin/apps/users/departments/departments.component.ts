import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { DepartmentList } from '../UserModels/DepartmentModel';
import { UserDetails } from '../UserModels/UserDetailModel';
import { UserserviceService } from '../userservice.service';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  @ViewChild('op',{static:true}) ele: ElementRef;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,private confirmationService: ConfirmationService,private userService:UserserviceService) { }
  public data =[];
  public product:DepartmentList;
  AddForm!: FormGroup;
  ngOnInit(): void {
    this.user=false;
    this.AddForm = this.formBuilder.group({
      depname: ['', [Validators.required,Validators.maxLength(50)]],
      desc: ['', [Validators.required,Validators.maxLength(100)]],
      
    }) 
    this.GetAllDepartment();
   
  }
  GetAllDepartment(){
    this.userService.getAllDepartments().subscribe((response)=>{
      this.data=response._embedded.departments;
       })  
  }
  NewDepartment(){
    this.display=true;
    this.AddForm = this.formBuilder.group({
      depname: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      
    }) 
  }
  clear(table: Table) {
    table.clear();
}
Cancel(){
  this.display=false;
  this.GetAllDepartment();
}
show(event,product){
  this.product=product;
  this.op.show(event);
}
Edit(product){
this.product=product;
this.edit=true;
this.op.hide();
}
EditCancel(edit:any){
this.edit=edit;
this.GetAllDepartment();
}
Delete(id){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.userService.deleteDepartments(id).subscribe(
        {
          next: (response)=>{
            this.GetAllDepartment();  
      },
      error: (err) => {
        this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
       //this.Cancel();
      }
     })
       
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
});
}
AddDepartment(){
  if (this.AddForm.valid) {
    this.product= new DepartmentList();
    this.product.name=this.AddForm.controls['depname'].value;
    this.product.description=this.AddForm.controls['desc'].value;
  this.userService.addDepartments(this.product.name,this.product.description).subscribe({
    next: (response)=>{
    // if(response.sTATUS=='SUCCESS'){
      this.GetAllDepartment();
      this.display=false;
      
   },
   error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
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
}
