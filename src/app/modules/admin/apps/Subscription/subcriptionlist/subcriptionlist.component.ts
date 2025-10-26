import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product/product.service';
import { Country } from '../../product/productModel/country';
import { UserDetails } from '../../users/UserModels/UserDetailModel';
import { SubscriptionService } from '../subscription.service';
import { Subscriptionlist } from '../subscriptionModel/subscription';

@Component({
  providers: [ConfirmationService],
  selector: 'app-subcriptionlist',
  templateUrl: './subcriptionlist.component.html',
  styleUrls: ['./subcriptionlist.component.scss']
})
export class SubcriptionlistComponent implements OnInit {
  @ViewChild('op',{static:true}) op: OverlayPanel;
  @ViewChild('op',{static:true}) ele: ElementRef;
  @ViewChild('al',{static:true}) al: OverlayPanel;
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  isLimitedBookOffer: any;
  isNoOfBooksNeeded: any;
  index: number;
  public subscription: Array<Subscriptionlist>=[];
  public activeList: Array<Subscriptionlist>=[];
  public deActiveList: Array<Subscriptionlist>=[];
  public subscriptionData: any;
  msgs: Message[] = [];
  addForm!: FormGroup;
  editForm!: FormGroup;
  AddSubscrib: boolean;
  planName: string;
  planDuration: string;
  planAmount: number;
  planDetails: any;
 
  constructor(public formBuilder: FormBuilder,public countryservice: ProductService,private subscriptionService: SubscriptionService,private router: Router,private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this.index=0;
    this.user=false;
  this.Getsubscription();
  this.addForm = this.formBuilder.group({
    plan: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    details: ['', [Validators.required]],
  });
  this.editForm = this.formBuilder.group({
    editplan: ['', [Validators.required]],
    editduration: ['', [Validators.required]],
    editamount: ['', [Validators.required]],
    editdetails: ['', [Validators.required]],
  });
  }

  Getsubscription(){
    this.subscriptionService.getSubscription().subscribe((response)=>{
      //if(response._embedded.users.length>0){
      console.log(response);
        this.subscription= new Array<Subscriptionlist>();
        this.subscription=response.content;
        this.activeList=this.subscription.filter(x=>x.status=='ACTIVE');
        this.deActiveList=this.subscription.filter(x=>x.status=='DE_ACTIVE');
        console.log(this.subscription);
      //}
       });
  }

Create(){
this.AddSubscrib=true;
}
AddSubscription(){
  console.log(this.addForm);
    if (this.addForm.valid) {
      this.subscriptionData = new Subscriptionlist();
      console.log(this.subscriptionData);
        this.subscriptionData = {
          ...this.addForm.value
        };
        console.log(this.subscriptionData);
        this.subscriptionService.addSubscription(this.subscriptionData).subscribe({
          next: (response) => {
            this.Cancel();
            this.Getsubscription();
          },
          error: (err) => {
            //  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
          }
        });
    }
    else {
      console.log(this.addForm);
      this.validateAllFields(this.addForm);
    }
}
EditSubscription(){
  console.log(this.editForm);
  if (this.editForm.valid) {
    const id= this.subscriptionData.id;
      this.subscriptionData = {
        ...this.editForm.value
      };
      this.subscriptionData.id=id;
      console.log(this.subscriptionData);
      this.subscriptionService.updateSubscription(this.subscriptionData).subscribe({
        next: (response) => {
          this.EditCancel();
          this.Getsubscription();
        },
        error: (err) => {
          //  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
        }
      });
  }
  else {
    console.log(this.addForm);
    this.validateAllFields(this.addForm);
  }
}

get getControl(){
  return this.addForm.controls;
}
get getEditControl(){
  return this.editForm.controls;
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
Cancel(){
  this.display=false;
  this.index=0;
  this.AddSubscrib= false;
  this.Getsubscription();
}

show(event,subscriptionData){
  this.subscriptionData=subscriptionData;
  this.op.show(event);
}
UpdateRoyalty(){
  this.router.navigate(['apps/Royalty/updateRoyalty']);
}
ActivatePlan(){
  this.confirmationService.confirm({
    message: 'Do you want to activate this record?',
    header: 'Activate Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
  this.subscriptionService.activateSubscription(this.subscriptionData.id,).subscribe((response)=>{
    this.Getsubscription();
  });
    },
    reject: () => {
      this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      //Actual logic to perform a confirmation
  }
});
}

showArchived(event,subscriptionData){
  this.subscriptionData=subscriptionData;
  this.al.show(event);
}

showedit(){
this.edit=true;
console.log(this.subscriptionData);
this.planName=this.subscriptionData.name;
this.planDuration=this.subscriptionData.duration;
this.planAmount=this.subscriptionData.amount;
this.planDetails=this.subscriptionData.details;
this.op.hide();
}
EditCancel(){
this.edit=false;
this.editForm.reset();
this.Getsubscription();
}
ShowUser(subscriptionData){
  this.subscriptionData=subscriptionData;
  this.user=true;
}





DeActivate(){
  this.confirmationService.confirm({
    message: 'Do you want to de-activate this record?',
    header: 'De-activate Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
  this.subscriptionService.deActivateSubscription(this.subscriptionData.id,).subscribe((response)=>{
    this.Getsubscription();
  });
    },
    reject: () => {
      this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      //Actual logic to perform a confirmation
  }
});

}

onLimitedBookChange(event) {
  this.isLimitedBookOffer= event.value;
  this.isNoOfBooksNeeded= event.checked;
  console.log(event);
    }
}
