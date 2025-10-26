import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  data: any;
  dropdownOptions: any[];
  perPage: number = 10;
  page: number=0;
  totalRecords: number=500000;
  public supportlist: Array<any>;
  public searchSupportlist: Array<any>;
  closeForm!: FormGroup;
  selectedToClose: any;
  display: boolean;
    constructor(public formBuilder: FormBuilder,public settingservice: SettingsService) { }

    ngOnInit(): void {
      this.data=[{'orderno':'DCB1012','product':'Chemmen','format':'Audio','readers':15,'duration':'20 hrs 10min','revenue':'120 INR','customer':' Jhon','amount':'150 INR','date':'22nd August 2022','platform':'web','payment':'cash','warehouse':'ERK EDP','edd':'06-06-2022','status':'processing'}];
      this.closeForm = this.formBuilder.group({
        adminComment: ['', [Validators.required]],
      });
      this.dropdownOptions = [
        { label: 'CLOSED', value: 'CLOSED' },
        { label: 'OPEN', value: 'OPEN' }
      ];
      this.GetSupport();
      console.log(this.supportlist);
    }
    GetSupport(){
      this.settingservice.getSupport(this.page,this.perPage).subscribe((response)=>{
          this.supportlist= new Array<any>();
          this.supportlist=response.content;
          this.totalRecords=response.totalElements;
          console.log(this.supportlist);
         });
         
    } 
    LazySupport(event){
      this.page = event.first / event.rows ;
      this.perPage=event.rows;
      this.GetSupport();

    }
    ChangeStatus(product){
    this.selectedToClose=product;
      if(product.status==='CLOSED'){
      this.display=true;
      }
      else{
        this.updateStatus('');
      }
    }
    CloseTicket(){
      if (this.closeForm.valid) {
        const adminComment=this.closeForm.controls['adminComment'].value;
        console.log(adminComment);
        this.updateStatus(adminComment);
        }
        else{
          this.validateAllFields(this.closeForm);
        }
    }
    updateStatus(adminComment: string){
      this.settingservice.updateSupportStatus(this.selectedToClose.id,this.selectedToClose.status,adminComment).subscribe((response)=>{
        this.GetSupport();
        });
        this.display=false;
    }
    Cancel(){
      this.display=false;
      this.closeForm.reset();
      this.selectedToClose.status='OPEN';
    }
    get getControl(){
      return this.closeForm.controls;
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
    applyGlobalFilter(event){
      const emailid=event.target.value;
      this.SearchSupport(emailid).then(() => {
        this.supportlist= new Array<any>();
        this.supportlist=this.searchSupportlist;
        });
    }
    SearchSupport(emailid): Promise<any>{
      return new Promise<any[]>((resolve, reject) => {
      this.settingservice.searchSupport(emailid,this.page,this.perPage).subscribe({
        next: (response)=>{
          this.searchSupportlist=response.content;
          this.totalRecords=response.totalElements;
          resolve(this.searchSupportlist);
    },
    error: (err) => {
    //  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    }
    });

      });
    }
    clear(){
      this.searchInputControl.setValue('');
      this.GetSupport();
    }
}
