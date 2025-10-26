import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DepartmentList } from '../UserModels/DepartmentModel';
import { RoleList } from '../UserModels/Rolelist';
import {DepartmentDetails, RoleDetails, UserDetails} from '../UserModels/UserDetailModel';
import { UserserviceService } from '../userservice.service';
@Component({
  providers: [ConfirmationService,ToastrService],
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  @Output() edit =new EventEmitter<boolean>();
  @Input() UserDetail: UserDetails;
  public close: boolean=true;
  public Details: UserDetails;
  EditUserForm!: FormGroup;
  public departmentlist: Array<DepartmentList>;
 public rolelist: Array<RoleList>;
 public selectedRoleid: number;
 public selectedDepartmentid: number;
 noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder,public toastr: ToastrService,private userService: UserserviceService) { }

  ngOnInit(){


  //  this.Details.department= new DepartmentDetails();
  //  this.Details.role= new RoleDetails();

    this.EditUserForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.maxLength(50)]],
      phone: ['', [Validators.required]],
      role: ['',[Validators.required]],
      department: ['',[Validators.required]],
    });
    this.GetAllDepartment();
    this.GetRoles();
    this.Details=new UserDetails();
    this.Details=this.UserDetail;
    this.selectedRoleid=this.Details.role._links.self.href;
    this.selectedDepartmentid=this.Details.department._links.self.href;
  }

  Cancel(){
    this.edit.emit(false);

  }
  EditUserDetails(){
    if (this.EditUserForm.valid) {
      this.Details= new UserDetails();
      this.Details.id=this.UserDetail.id;
      this.Details.name=this.EditUserForm.controls['name'].value;
      this.Details.phone=this.EditUserForm.controls['phone'].value;
      this.Details.role=this.EditUserForm.controls['role'].value;
      this.Details.department=this.EditUserForm.controls['department'].value;
    this.userService.editUserDetails(this.Details).subscribe({
     next: (response)=>{
      console.log(response);
      if(response.sTATUS=='SUCCESS'){
        console.log('SUCCESS');
        this.Cancel();
         this.toastr.success('Successfully Added!', 'Success');
        }
        else{
         this.toastr.error(response.mSG,'Error');
        }
     },
     error: (err) => {
       this.toastr.error(err.status,'Error');
     }
   });
  
      }
       else {
        this.validateAllFields(this.EditUserForm);
    }
  }
  get getControl(){
    return this.EditUserForm.controls;
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
  GetAllDepartment(){
    this.userService.getAllDepartments().subscribe((response)=>{
      this.departmentlist= new Array<DepartmentList>();
      this.departmentlist=response._embedded.departments;
       });
  }
  GetRoles(){
    this.userService.getRoles().subscribe((response)=>{
      this.rolelist=new Array<RoleList>();
      this.rolelist=response._embedded.roles;
       });

  }
}
