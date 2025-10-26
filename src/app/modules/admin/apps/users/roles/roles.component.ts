import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserserviceService } from '../userservice.service';
import { RoleList } from '../UserModels/Rolelist';

@Component({
  providers: [ConfirmationService, MessageService],
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op', { static: true }) op: OverlayPanel;
  @ViewChild('op', { static: true }) ele: ElementRef;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  EditForm!: FormGroup;
  displayEdit: boolean=false;
  constructor(private router: Router, private messageService: MessageService, public formBuilder: FormBuilder, private confirmationService: ConfirmationService, private userService: UserserviceService) { }//
  public rolelist: RoleList;
  public product: RoleList;
  AddForm!: FormGroup;
  ngOnInit(): void {
    this.user = false;
    this.GetRoles();
    this.AddForm = this.formBuilder.group({
      rolename: ['', [Validators.required, Validators.maxLength(50)]],
      desc: ['', [Validators.required, Validators.maxLength(100)]],
    });
    this.EditForm = this.formBuilder.group({
      editName: ['', [Validators.required, Validators.maxLength(50)]],
      editDescription: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }
  GetRoles() {
    this.userService.getRoles().subscribe((response) => {
      this.rolelist = response._embedded.roles;
    });
    this.product=new RoleList();
  }
  NewDepartment() {
    this.display = true;
  }
  clear(table: Table) {
    table.clear();
  }
  Cancel() {
    this.display = false;
    this.AddForm.reset();
  }
  EditCancel() {
    this.displayEdit = false;
  }
  show(event, product) {
    this.product = product;
    this.op.show(event);
  }
  Edit(product: any) {
    this.displayEdit=true;
    this.product = product;
    console.log(this.product);
  }
  Privileges(product: any) {
    this.product = product;
    this.router.navigate([`apps/users/EditRoles/`, this.product], { skipLocationChange: true });
    this.op.hide();
  }
  Delete(role) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.deleteRoles(role.id).subscribe({
          next: (response) => {
            // if(response.sTATUS=='SUCCESS'){
            this.GetRoles();
            this.display = false;

            // }
            // else{
            //  this.toastr.error(response.mSG,'Error')
            // }

          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
          }
        })
      },
      reject: () => {
        //Actual logic to perform a confirmation
      }
    });
  }
  AddRoles() {
    if (this.AddForm.valid) {
      this.rolelist = new RoleList();
      this.rolelist.type = this.AddForm.controls['rolename'].value;
      this.rolelist.description = this.AddForm.controls['desc'].value;
     
      this.userService.addRoles(this.rolelist.type, this.rolelist.description).subscribe({
        next: (response) => {
          // if(response.sTATUS=='SUCCESS'){
          this.GetRoles();
          this.Cancel();
          //this.toastr.success('Successfully Added!', 'Success');
          // }
          // else{
          //  this.toastr.error(response.mSG,'Error')
          // }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
        }
      });
    }
    else {
      this.validateAllFields(this.AddForm);
    }
  }
  EditRoles(){
    if (this.EditForm.valid) {
      this.rolelist = new RoleList();
      this.rolelist.type = this.EditForm.controls['editName'].value;
      this.rolelist.description = this.EditForm.controls['editDescription'].value;
      this.rolelist.id=this.product.id;
      this.userService.editRoles(this.rolelist.id, this.rolelist.type, this.rolelist.description).subscribe({
        next: (response) => {
          // if(response.sTATUS=='SUCCESS'){
          this.GetRoles();
          this.EditCancel();
          //this.toastr.success('Successfully Added!', 'Success');
          // }
          // else{
          //  this.toastr.error(response.mSG,'Error')
          // }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
        }
      });
    }
    else {
      this.validateAllFields(this.EditForm);
    }
  }
  get getControl() {
    return this.AddForm.controls;
  }
  get getEditControl(){
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
