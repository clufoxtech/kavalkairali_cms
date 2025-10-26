import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserDetails } from '../../users/UserModels/UserDetailModel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { MessageService } from 'primeng/api';

@Component({
  providers:[MessageService],
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.scss']
})
export class AddcustomerComponent implements OnInit {
AddCustomerForm!: FormGroup;
noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
fieldTextType: boolean=false;
@Output() display =new EventEmitter<boolean>();
public closable:boolean=true;
  constructor(public formBuilder: FormBuilder,public customerservice:CustomerService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.AddCustomerForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.maxLength(50)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      secondName: ['', []],
    }) 
  }
  
  AddCustomer(){
  
    if (this.AddCustomerForm.valid) {
     console.log(this.AddCustomerForm.value)
      this.customerservice.addCustomer(this.AddCustomerForm.value).subscribe({
       next: (response)=>{
        this.CancelCustomer();
   },
   error: (err) => {
    this.messageService.add({severity:'error',summary:err.error.status, detail:err.error.error});
    this.CancelCustomer();
   }
  })
}
  else {
      this.validateAllFields(this.AddCustomerForm); 
  }
  
  }
  CancelCustomer(){
    this.display.emit(false);
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  get getControl(){
    return this.AddCustomerForm.controls;
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
