import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { CampaignService } from '../campaign.service';
import { ActivateList, OfferList } from '../CampaignModel/coupon';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-campaignlist',
  templateUrl: './campaignlist.component.html',
  styleUrls: ['./campaignlist.component.scss']
})
export class CampaignlistComponent implements OnInit {
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  @ViewChild('op',{static:true}) ele: ElementRef;
  @ViewChild('al',{static:true}) al: OverlayPanel;
  @ViewChild('ne',{static:true}) ne: OverlayPanel;
  @ViewChild('dc',{static:true}) dc: OverlayPanel;
  @ViewChild('np',{static:true}) np: OverlayPanel;
  @ViewChild('na',{static:true}) na: OverlayPanel;
  @ViewChild('ac',{static:true}) ac: OverlayPanel;
  selectedFiles: any;
  imagePath: any;
  url: string | ArrayBuffer;
  constructor(public formBuilder: FormBuilder,private couponService:CampaignService,private router: Router,private confirmationService: ConfirmationService) { }
  public ActiveOfferList :Array<OfferList>=[];
  public DiscontinueOfferList :Array<OfferList>=[];
  public NewOfferList:Array<OfferList>=[];
  public offerbook: OfferList;
  msgs: Message[] = [];
  public status:string;
  public BookType:string;
  public index:number;
  public statusindex:number;
  public data:any[];
  perPage = 50;
  page=0;
  totalRecords=500000;
  ActivateForm!: FormGroup;
  activateDetails:ActivateList;
  ngOnInit(): void {
    this.index=0;
    this.statusindex=0;
    this.status='ACTIVE';
    this.BookType='PRINT';
  this.GetActiveOffer();
  this.ActivateForm = this.formBuilder.group({
    startDate: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    endTime: ['', [Validators.required]],

  });
  }
  GetActiveOffer(){
    this.couponService.getOfferList(this.BookType,this.status,this.page,this.perPage).subscribe((response)=>{
      //if(response._embedded.users.length>0){
        this.ActiveOfferList= new Array<OfferList>();
        this.ActiveOfferList=response.content;
        console.log(this.ActiveOfferList);
      //}
       });
  }
  GetDiscontinueOffer(){
    this.couponService.getOfferList(this.BookType,this.status,this.page,this.perPage).subscribe((response)=>{
      //if(response._embedded.users.length>0){
        this.DiscontinueOfferList= new Array<OfferList>();
        this.DiscontinueOfferList=response.content;
        console.log(this.DiscontinueOfferList);
      //}
       });
  }
  GetNewOffer(){
    console.log(this.BookType,this.status);
    this.couponService.getOfferList(this.BookType,this.status,this.page,this.perPage).subscribe((response)=>{
      //if(response._embedded.users.length>0){
        this.NewOfferList= new Array<OfferList>();
        this.NewOfferList=response.content;
        console.log(this.NewOfferList);
      //}
       });
  }
  handleMainTab(e){
    this.index=e.index;
    if(this.index==0){
      this.statusindex=0;
      this.status='ACTIVE';
      this.BookType='PRINT';
      this.GetActiveOffer();

    }
    else if(this.index==1){
      this.statusindex=0;
      this.status='ACTIVE';
      this.BookType='EBOOK';
      this.GetActiveOffer();

    }
    else if(this.index==2){
      this.statusindex=0;
      this.status='ACTIVE';
      this.BookType='AUDIO';
      this.GetActiveOffer();

    }
  }

  handleTab(e){
    this.statusindex=e.index;
    if(this.statusindex==0){
      this.status='ACTIVE';
      this.GetActiveOffer();
    }
    else if(this.statusindex==1){
      this.status='DISCONTINUED';
      this.GetDiscontinueOffer();
    }
    else if(this.statusindex==2){
      this.status='NEW';
      this.GetNewOffer();
    }
  }
  NewOffer(){
    this.router.navigate(['apps/Campaigns/addcampaign']);
  }
  clear(table: Table) {
    table.clear();
}
Cancel(display:any){
  this.display=display;
  this.index=0;

}

show(event,offerdetail){
 this.activateDetails=offerdetail;
  this.op.show(event);
}
UpdateRoyalty(UserDetail){
  this.router.navigate(['apps/Royalty/updateRoyalty']);
}
BookDetails(UserDetail){
  this.router.navigate(['apps/Royalty/royaltyBook']);
}

showArchived(event,offerdetail){
  this.activateDetails=offerdetail;
  this.offerbook=offerdetail;
  this.al.show(event);
}
showNewEbookOptions(event,offerdetail){
  this.offerbook=offerdetail;
  this.ne.show(event);
}
showNewPrintOptions(event,offerdetail){
  this.offerbook=offerdetail;
  this.np.show(event);
}
showNewAudioOptions(event,offerdetail){
  this.offerbook=offerdetail;
  this.na.show(event);
}
EditOffer(activateDetails){
  activateDetails.bookType=this.BookType;
  const queryParams = { activateDetails: JSON.stringify(activateDetails) };
  this.router.navigate(['apps/Campaigns/addcampaign'], { queryParams });
}

Delete(status: any): void {
  console.log(this.offerbook);
  this.confirmationService.confirm({
    message: 'Do you want to remove this record?',
    header: 'Remove Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.couponService.deleteOffer(this.offerbook.id).subscribe((response)=>{
       if(status==='DEACTIVE'){
        this.DiscontinueOfferList = this.DiscontinueOfferList.filter(x => x.id !== this.offerbook.id);
       }
       if(status==='NEW' ){
        this.NewOfferList = this.NewOfferList.filter(x => x.id !== this.offerbook.id);
        console.log(this.NewOfferList);
       }
      });
    },
    reject: () => false
  });
  console.log('couponList');
}
ChangeStatus(offerdetail,status){
  this.couponService.changeOfferStatus(offerdetail,status).subscribe({
       next: (response)=>{
       this.GetActiveOffer();
       this.GetDiscontinueOffer();
       this.GetNewOffer();

       },
       error: (err) => {
       //  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
       }
     });
 }
 showActivate(event)
 {
  this.dc.show(event);
 }
 ActivateCoupon(offeractive){
  if (this.ActivateForm.valid) {
   console.log(this.offerbook);
    this.activateDetails=new ActivateList();
    this.activateDetails.id=this.offerbook.id;
     this.activateDetails.startDate=this.ActivateForm.value['startDate'];
     this.activateDetails.startTime=this.ActivateForm.value['startTime'];
     this.activateDetails.endDate=this.ActivateForm.value['endDate'];
     this.activateDetails.endTime=this.ActivateForm.value['endTime'];
     this.ChangeStatus(this.activateDetails,'ACTIVE');
     this.ActivateForm.reset();
     this.dc.hide();
     this.ac.show(offeractive);
  }
   else{
    this.validateAllFields(this.ActivateForm);
   }
 }
 confirmOk(){
  this.ac.hide();
 }

 get getDateControl(){
  return this.ActivateForm.controls;
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
showOfferDetails(product){
  console.log('apps/Campaigns/campaign-detail;offerId='+product.id);
  console.log(product);
  this.router.navigate(['apps/Campaigns/campaign-detail',product]);
}

}
