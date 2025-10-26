import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DepartmentList } from '../UserModels/DepartmentModel';
import { RoleList } from '../UserModels/Rolelist';
import { UserDetails } from '../UserModels/UserDetailModel';
import { UserserviceService } from '../userservice.service';
@Component({
  providers: [MessageService],
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {
 public closable:boolean=true;
 AddUserForm!: FormGroup;
 @ViewChild('Dialog') dialogObj: NewuserComponent;
 public AddUserList:UserDetails;
 public departmentlist:DepartmentList;
 public ActiveUserList :Array<UserDetails>=[];
 public rolelist:RoleList;
 noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
 fieldTextType: boolean=false;
@Output() display =new EventEmitter<boolean>();
  constructor(public formBuilder: FormBuilder,private userService:UserserviceService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.GetAllDepartment();
    this.GetRoles();
    this.AddUserForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.maxLength(50)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      department: ['', [Validators.required]],
      role: ['', [Validators.required]],
      username: ['', [Validators.required]],
    }) 
    
  }
  Cancel(){
    this.display.emit(false);
  }

  get getControl(){
    return this.AddUserForm.controls;
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
  AddUser(){
    this.AddUserList= new UserDetails();
    if (this.AddUserForm.valid) {
      this.AddUserList.name=this.AddUserForm.controls['name'].value;
      this.AddUserList.password=this.AddUserForm.controls['password'].value;
      this.AddUserList.phone=this.AddUserForm.controls['phone'].value;
      this.AddUserList.email=this.AddUserForm.controls['email'].value;
      this.AddUserList.department=this.AddUserForm.controls['department'].value;
      this.AddUserList.role=this.AddUserForm.controls['role'].value;
      this.AddUserList.status='ACTIVE';
      this.userService.addUsers(this.AddUserList).subscribe({
       next: (response)=>{
        this.Cancel();
   },
   error: (err) => {
    this.messageService.add({severity:'error',summary:err.error.status, detail:err.error.error});
    //this.Cancel();
   }
  })
}
  else {
      this.validateAllFields(this.AddUserForm); 
  }
  
}  
GetAllDepartment(){
  this.userService.getAllDepartments().subscribe((response)=>{
    this.departmentlist=response._embedded.departments;
     })  
}  
GetRoles(){
  this.userService.getRoles().subscribe((response)=>{
    this.rolelist=response._embedded.roles;
     })  
}

toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

}
