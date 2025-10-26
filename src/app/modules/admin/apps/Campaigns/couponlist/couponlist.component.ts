import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { DepartmentList } from '../../users/UserModels/DepartmentModel';
import { UserDetails } from '../../users/UserModels/UserDetailModel';
import { CampaignService } from '../campaign.service';
import { CouponList } from '../CampaignModel/coupon';

@Component({
  providers: [ConfirmationService, MessageService],
  selector: 'app-couponlist',
  templateUrl: './couponlist.component.html',
  styleUrls: ['./couponlist.component.scss']
})
export class CouponlistComponent implements OnInit {
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op', { static: true }) op: OverlayPanel;
  @ViewChild('al', { static: true }) al: OverlayPanel;
  @ViewChild('eaal', { static: true }) eaal: OverlayPanel;
  @ViewChild('nw', { static: true }) nw: OverlayPanel;
  @ViewChild('eanw', { static: true }) eanw: OverlayPanel;
  @ViewChild('dc', { static: true }) dc: OverlayPanel;
  mainIndex: any;
  activeCouponsPrint: any;
  activeCouponsEBook: CouponList[];
  activeCouponsAudio: CouponList[];
  deactiveCouponsPrint: CouponList[];
  deactiveCouponsEBook: CouponList[];
  deactiveCouponsAudio: CouponList[];
  newCouponListPrint: CouponList[];
  newCouponListEBook: CouponList[];
  newCouponListAudio: CouponList[];
  coupondetail: any;
  isDeleted: boolean;
  constructor(public formBuilder: FormBuilder, private couponService: CampaignService, private router: Router, private confirmationService: ConfirmationService) { }
  public ActiveCouponList: Array<CouponList> = [];
  public DeActivatedCouponList: Array<CouponList> = [];
  public NewCouponList: Array<CouponList> = [];
  perPage = 50;
  page = 0;
  totalRecords = 500000;
  public product: DepartmentList;
  public UserDetail: UserDetails;
  public archiveuser: UserDetails;
  msgs: Message[] = [];
  public status: string;
  public index: number;
  public data: any[];
  AddForm!: FormGroup;
  ActivateForm!: FormGroup;
  EditForm!: FormGroup;
  public LimitType: Array<any>;
  public EligibilityType: Array<any>;
  public ApplicableType: Array<any>;
  public IndividualLimit: Array<any>;
  selectedLimitType: any = '';
  selectedOfferType: any = '';
  public couponAddList: CouponList;
  public couponDetail: CouponList;
  public OfferType: Array<any>;
  public isEditing: boolean = false;
  code: any;
  ngOnInit(): void {
    this.index = 0;
    this.status = 'ACTIVE';
    this.user = false;
    this.GetActiveCoupons();

    this.AddForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      couponId: ['', [Validators.required]],
      type: ['', [Validators.required]],
      amountOrPercentage: ['', [Validators.required]],
      userLimit: ['', []],
      description: ['', [Validators.required]],
      detail: ['', [Validators.required]],
      maxDiscount: ['', []],
      couponBookType: ['', []],
      individualLimit: ['', []],
      eligibility: ['', []],
      isNoLimit: ['', []],
    });
    this.ActivateForm = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
    });
    this.couponDetail = new CouponList();

  }
  initilisationFun() {
    this.LimitType = [
      { name: 'Limit', code: true },
      { name: 'No Limit', code: false }
    ];
    this.EligibilityType = [
      { name: 'First Purchase', code: "FIRST_PURCHASE" },
      { name: 'Always', code: "ALWAYS" }
    ];
    this.OfferType = [
      { name: 'Percentage', code: "PERCENTAGE" },
      { name: 'Amount', code: "AMOUNT" }
    ];

    this.ApplicableType = [
      { name: 'Print', code: 'PRINT' },
      { name: 'EBook', code: 'EBOOK' },
      { name: 'Audio', code: 'AUDIO' },
    ];
    this.IndividualLimit = [
      { name: 'Unlimited', code: 0 },
      { name: 'Once', code: 1 }
    ];
  }
  handleMainTab(e) {
    this.mainIndex = e.index;
    if (this.mainIndex === 0) {
      this.index = 0;
      this.status = 'ACTIVE';
      this.activeCouponsPrint = this.ActiveCouponList.filter(x => x.couponBookType === 'PRINT');
      console.log(this.activeCouponsPrint);
    }
    else if (this.mainIndex === 1) {
      this.index = 0;
      this.status = 'ACTIVE';
      this.activeCouponsEBook = this.ActiveCouponList.filter(x => x.couponBookType === 'EBOOK');
    }
    else if (this.mainIndex === 2) {
      this.index = 0;
      this.status = 'ACTIVE';
      this.activeCouponsEBook = this.ActiveCouponList.filter(x => x.couponBookType === 'AUDIO');
    }
  }
  handleTab(e) {
    this.index = e.index;
    if (this.index === 0) {
      this.status = 'ACTIVE';
      this.GetActiveCoupons();
    }
    else if (this.index === 1) {
      this.status = 'DEACTIVE';
      this.GetDeActivatedCoupons();
    }
    else if (this.index === 2) {
      this.status = 'NEW';
      this.GetNewCoupons();
    }
  }
  GetActiveCoupons() {
    this.couponService.getCouponsList(this.status).subscribe((response) => {
      this.ActiveCouponList = new Array<CouponList>();
      this.ActiveCouponList = response.content;
      this.activeCouponsPrint = this.ActiveCouponList.filter(x => x.couponBookType === 'PRINT');
      this.activeCouponsEBook = this.ActiveCouponList.filter(x => x.couponBookType === 'EBOOK');
      this.activeCouponsAudio = this.ActiveCouponList.filter(x => x.couponBookType === 'AUDIO');
      console.log(this.ActiveCouponList);
    });
  }

  GetDeActivatedCoupons() {
    this.couponService.getCouponsList(this.status).subscribe((response) => {
      //if(response._embedded.users.length>0){
      this.DeActivatedCouponList = new Array<CouponList>();
      this.DeActivatedCouponList = response.content;
      this.deactiveCouponsPrint = this.DeActivatedCouponList.filter(x => x.couponBookType === 'PRINT');
      this.deactiveCouponsEBook = this.DeActivatedCouponList.filter(x => x.couponBookType === 'EBOOK');
      this.deactiveCouponsAudio = this.DeActivatedCouponList.filter(x => x.couponBookType === 'AUDIO');
      console.log(this.DeActivatedCouponList);
      //}
    });
  }
  GetNewCoupons() {
    this.couponService.getCouponsList(this.status).subscribe((response) => {
      //if(response._embedded.users.length>0){
      this.NewCouponList = new Array<CouponList>();
      this.NewCouponList = response.content;
      this.newCouponListPrint = this.NewCouponList.filter(x => x.couponBookType === 'PRINT');
      this.newCouponListEBook = this.NewCouponList.filter(x => x.couponBookType === 'EBOOK');
      this.newCouponListAudio = this.NewCouponList.filter(x => x.couponBookType === 'AUDIO');
      console.log(this.NewCouponList);
      //}
    });
  }
  LazyLoadActiveCoupons(event) {
    this.page = event.first / event.rows;
    this.perPage = event.rows;
    this.GetActiveCoupons();
  }
  LazyLoadDeActivatedCoupons(event) {
    this.page = event.first / event.rows;
    this.perPage = event.rows;
    this.GetDeActivatedCoupons();
  }
  LazyLoadNewCoupons(event) {
    this.page = event.first / event.rows;
    this.perPage = event.rows;
    this.GetNewCoupons();
  }
  NewCoupon() {
    this.display = true;
    this.initilisationFun();
    this.selectedLimitType = '';
    this.selectedOfferType = '';

  }
  clear(table: Table) {
    table.clear();
  }
  Cancel() {
    this.display = false;
    this.AddForm.reset();
    this.GetActiveCoupons();
    this.isEditing = false;

  }
  EditCoupon(couponDetail) {
    this.isEditing = true;
    this.display = true;
    this.initilisationFun();
    this.couponDetail = couponDetail;
    this.selectedLimitType = this.couponDetail.isNoLimit;
    this.selectedOfferType = this.couponDetail.type;
  }
  showActive(event, coupondetail) {
    this.couponDetail = coupondetail;
    this.op.show(event);
  }
  showDeActivated(event, coupondetail) {
    this.couponDetail = coupondetail;
    this.al.show(event);
  }
  showNew(event, coupondetail) {
    this.couponDetail = coupondetail;
    this.nw.show(event);
  }
  showNewEAudio(event, coupondetail) {
    this.couponDetail = coupondetail;
    this.eanw.show(event);
  }
  showDeActivatedEAudio(event, coupondetail) {
    this.couponDetail = coupondetail;
    this.eaal.show(event);
  }
  ChangeStatus(coupondetail, status) {
    this.couponService.changeCouponStatus(coupondetail, status).subscribe({
      next: (response) => {
        this.GetActiveCoupons();
        this.GetDeActivatedCoupons();
        this.GetNewCoupons();
      },
      error: (err) => {
        //  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
      }
    });
  }

  ActivateCoupon() {
    if (this.ActivateForm.valid) {
      this.couponDetail.startDate = this.ActivateForm.value['startDate'];
      this.couponDetail.startTime = this.ActivateForm.value['startTime'];
      this.couponDetail.endDate = this.ActivateForm.value['endDate'];
      this.couponDetail.endTime = this.ActivateForm.value['endTime'];
      this.ChangeStatus(this.couponDetail, 'ACTIVE');
      this.ActivateForm.reset();
      this.dc.hide();
    }
    else {
      this.validateAllFields(this.ActivateForm);
    }
  }

  AddCoupon() {
    if (this.AddForm.valid) {
      this.couponAddList = new CouponList();
      if (this.isEditing) {
        this.couponAddList = {
          ...this.AddForm.value,
          status: this.status,
          couponId: this.couponDetail.id
        };
        console.log(this.couponAddList);
        this.couponService.editCoupon(this.couponAddList).subscribe({
          next: (response) => {
            this.Cancel();
            this.GetNewCoupons();
          },
          error: (err) => {
            //  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
          }
        });
      }
      else {
        this.couponAddList = {
          ...this.AddForm.value,
          status: 'NEW'
        };
        console.log(this.couponAddList);
        this.couponService.addCoupon(this.couponAddList).subscribe({
          next: (response) => {
            this.Cancel();
            this.GetNewCoupons();
          },
          error: (err) => {
            //  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
          }
        });
      }
      this.AddForm.reset();
    }
    else {
      console.log(this.AddForm);
      this.validateAllFields(this.AddForm);
    }
  }

  Delete(couponDetail: any, ): void {
    console.log(couponDetail);
    //console.log(couponList.id);
    this.confirmationService.confirm({
      message: 'Do you want to remove this record?',
      header: 'Remove Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log('in the accept');
        this.couponService.deleteCoupon(couponDetail.id).subscribe((response)=>{
         if(couponDetail.status==='DEACTIVE' && couponDetail.couponBookType==='PRINT'){
          this.DeActivatedCouponList = this.DeActivatedCouponList.filter(x => x.id !== couponDetail.id);
          this.deactiveCouponsPrint = this.DeActivatedCouponList.filter(x => x.couponBookType === 'PRINT');
         }
         if(couponDetail.status==='NEW' && couponDetail.couponBookType==='PRINT'){
          this.NewCouponList = this.NewCouponList.filter(x => x.id !== couponDetail.id);
          this.newCouponListPrint = this.NewCouponList.filter(x => x.couponBookType === 'PRINT');
         }
         if(couponDetail.status==='DEACTIVE' && couponDetail.couponBookType==='EBOOK'){
          this.DeActivatedCouponList = this.DeActivatedCouponList.filter(x => x.id !== couponDetail.id);
          this.deactiveCouponsEBook = this.DeActivatedCouponList.filter(x => x.couponBookType === 'EBOOK');
         }
         if(couponDetail.status==='NEW' && couponDetail.couponBookType==='EBOOK'){
          this.NewCouponList = this.NewCouponList.filter(x => x.id !== couponDetail.id);
          this.newCouponListEBook = this.NewCouponList.filter(x => x.couponBookType === 'EBOOK');
         }
        });
      },
      reject: () => false
    });
    console.log('couponList');
  }



  Limit(event) {
    this.selectedLimitType = event.value;
  }
  CouponValue(event) {
    this.selectedOfferType = event.value;
  }
  get getControl() {
    return this.AddForm.controls;
  }
  get getDateControl() {
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
}
