import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DepartmentList } from '../UserModels/DepartmentModel';
import { UserserviceService } from '../userservice.service';

@Component({
  providers: [MessageService],
  selector: 'app-editdepartment',
  templateUrl: './editdepartment.component.html',
  styleUrls: ['./editdepartment.component.scss']
})
export class EditdepartmentComponent implements OnInit {
  @Output() edit =new EventEmitter<boolean>();
  @Input() product: DepartmentList;
  public close:boolean=true;
  public products:DepartmentList;
  EditForm!: FormGroup;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,private userService:UserserviceService) { }

  ngOnInit(): void {
    this.products=this.product;
    this.EditForm = this.formBuilder.group({
      depname: ['', [Validators.required,Validators.maxLength(50)]],
      desc: ['', [Validators.required,Validators.maxLength(100)]],
      
    }) 
  }
  Cancel(){
    this.edit.emit(false);
  }
  EditDepartment(){
    if (this.EditForm.valid) {
      this.products= new DepartmentList();
      this.products.id=this.product.id;
      this.products.name=this.EditForm.controls['depname'].value;
      this.products.description=this.EditForm.controls['desc'].value;
    this.userService.editDepartments(this.products.id,this.products.name,this.products.description).subscribe({
      next: (response)=>{
      // if(response.sTATUS=='SUCCESS'){
        //this.GetAllDepartment();
        this.Cancel();
         //this.toastr.success('Successfully Added!', 'Success');
        // }
        // else{
        //  this.toastr.error(response.mSG,'Error')
        // }
     },
     error: (err) => {
      this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
     }
   })
      }
       else {
        this.validateAllFields(this.EditForm); 
    } 
  }
  get getControl(){
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
}
