import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product/product.service';
import { Category } from '../../product/productModel/Category';
import { DepartmentList } from '../../users/UserModels/DepartmentModel';
import { MultipleSearch } from '../../Recommendation/ModelRecommendation/MultipleSearch';
import { RecommendationService } from '../../Recommendation/recommendation.service';
import { OfferList } from '../CampaignModel/coupon';
import { CampaignService } from '../campaign.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  providers: [ConfirmationService, MessageService],
  selector: 'app-addcampaign',
  templateUrl: './addcampaign.component.html',
  styleUrls: ['./addcampaign.component.scss']
})
export class AddcampaignComponent implements OnInit {
  AddForm!: FormGroup;
  SearchForm!: FormGroup;
  public product: DepartmentList;
  selectedCategory: Array<Category>;
  filtercategory: Array<Category> = [];
  public category: Array<Category>;
  public data: any[];
  selectedOfferType: any = '';
  public OfferType: Array<any>;
  public chooseBy: Array<any>;
  selectedBookType: any = '';
  public BookType: Array<any>;
  public individualLimit: Array<any>;
  selectedindividualLimit: any;
  public searchDetails: MultipleSearch;
  selectedProduct: any;
  public selectedFiles: any;
  public imagePath: string;
  public offerDetails: OfferList;
  public url: any;
  public nolimitvalue: boolean = false;
  public activateDetails: OfferList;
  public isEdit: boolean = false;
  list: any[] = []; // Initialize list array
  public selectedList: any[] = [];
  perPage = 10;
  page = 0;
  totalRecords: number = 500000;
  selectedChooseBy: any;
  isAllBookOffer: boolean = false;
  isLimitedBookOffer: boolean = false;
  isNoOfBooksNeeded: boolean = false;;
  constructor(private messageService: MessageService, public formBuilder: FormBuilder, private Aroute: ActivatedRoute, private offerService: CampaignService, public addservice: ProductService, private router: Router, public campaignService: RecommendationService) { }

  ngOnInit(): void {
    this.initialisationFun();
    this.data = [];
    this.selectedProduct = [];
    this.activateDetails = new OfferList();
    this.Aroute.queryParams.subscribe((params) => {
      if (params.activateDetails) {
        this.activateDetails = JSON.parse(params.activateDetails);
        this.isEdit = true;
        this.selectedOfferType = this.activateDetails.type;
        this.selectedList = this.activateDetails.offerBooks;
        this.nolimitvalue = this.activateDetails.isNoLimit || false;
        const maxDiscountControl = this.AddForm.get('maxDiscount');
        if (this.nolimitvalue) {
          maxDiscountControl.disable();
          // Clear the value in maxDiscount control
          maxDiscountControl.setValue('');
        }
        else {
          // Enable the maxDiscount control
          maxDiscountControl.enable();
        }
      }

    });
    console.log('test', this.activateDetails);

    this.GetCategory();
    this.GetAuthorContributor('AUTHOR');

  }
  ngAfterViewInit() {
    this.selectedBookType = this.activateDetails.bookType;
    this.selectedindividualLimit = this.activateDetails.individualLimit;
  }
  initialisationFun() {
    this.AddForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      offerPercentage: [''],
      offerAmount: [''],
      amountOrPercentage: [''],
      maxDiscount: [''],
      isAllBookOffer: [''],
      isLimitedBookOffer: [''],
      isNoLimit: [false],
      type: ['', [Validators.required]],
      offerImage: [''],
      startDate: ['', []],
      startTime: ['', []],
      endDate: ['', []],
      endTime: ['', []],
      description: ['', []],
      detail: ['', []],
      individualLimit: ['', []],
      bookType: ['', []],
      author: [''],
      category: [''],
    });

    this.OfferType = [
      { name: 'select', code: '' },
      { name: 'Percentage', code: 'PERCENTAGE' },
      // { name: 'Amount', code: 'AMOUNT' }
    ];
    this.chooseBy = [
      { name: 'select', code: '' },
      { name: 'Category', code: 'CATEGORY' },
      { name: 'Author', code: 'AUTHOR' }
    ];
    this.BookType = [
      { name: 'select', code: '' },
      { name: 'EBOOK', code: 'EBOOK' },
      { name: 'PRINT', code: 'PRINT' },
      { name: 'AUDIO', code: 'AUDIO' }

    ];
    this.individualLimit = [
      { name: 'select', code: '' },
      { name: 'UNLIMITED', code: 'UNLIMITED' },
      { name: 'ONCE', code: 'ONCE' },
      { name: '2', code: '2' },
      { name: '3', code: '3' },
      { name: '4', code: '4' },
      { name: '5', code: '5' },
      { name: '6', code: '6' },
      { name: '7', code: '7' },
      { name: '8', code: '8' },
      { name: '9', code: '9' },
      { name: '10', code: '10' },

    ];
  }
  GetCategory() {
    this.addservice.getCategory().subscribe((response) => {
      //if(response._embedded.categoryModels.length>0){
      this.category = new Array<Category>();
      this.category = response._embedded.categoryModels;
      console.log(this.category);
      //}
    });
  }
  GetAuthorContributor(type: string) {
    this.addservice.getContributorByType(type).subscribe((response) => {
      if (response._embedded.contributors.length > 0) {
      }
    });
  }
  GoBack() {
    this.router.navigate(['apps/Campaigns/campaignlist']);
  }
  cancel() {
    this.router.navigate(['apps/Campaigns/campaignlist']);
  }
  onFileChanged(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length === 0) {
      return;
    }
    const mimeType = this.selectedFiles[0].type;
    if (mimeType.match(/image\/*/) == null) {
      //this.message = "Only images are supported.";
      return;
    }

    const reader = new FileReader();
    this.imagePath = this.selectedFiles;
    reader.readAsDataURL(this.selectedFiles[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }
  AddOffer() {
    console.log(this.AddForm);
    if (this.AddForm.valid) {
      console.log(this.AddForm);
      if (this.isEdit) {
        console.log('isedit');
        this.offerDetails = new OfferList();
        this.offerDetails = this.activateDetails;
        console.log(this.offerDetails);
        this.AddImage();
      }
      else {
        console.log('else');
        this.offerDetails = new OfferList();
        this.offerDetails = this.AddForm.value;
        this.AddImage();
      }
    }
    else {
      this.validateAllFields(this.AddForm);
    }
  }


  ChangeBookType() {
    if (!this.isEdit) {
      this.selectedList = [];
    }
  }
  submitOffer() {
    this.offerDetails.isAllBookOffer = true;
    if(this.offerDetails.isNoLimit!==true){
       this.offerDetails.isNoLimit = false;
     }
    if (this.isEdit) {
      this.offerService.editOffer(this.offerDetails).subscribe({
        next: (response) => {
          this.offerDetails = new OfferList();
          this.router.navigate(['apps/Campaigns/campaignlist']);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });

        }
      });
    }
    else {
      this.offerService.addOffer(this.offerDetails).subscribe({
        next: (response) => {
          this.offerDetails = new OfferList();
          this.router.navigate(['apps/Campaigns/campaignlist']);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });

        }
      });
    }
  }
  clear() {
    this.SearchForm.reset();
  }
  get getControl() {
    return this.AddForm.controls;
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
  dropvalue(event) {
    this.selectedOfferType = event.value;
  }
  dropvalueChooseBy(event) {
    this.selectedChooseBy = event.value;
  }
  individualLimitChange(event) {
    this.selectedindividualLimit = event.value;
  }
  onNoLimitChange(event) {
    this.nolimitvalue = event.checked;
    const maxDiscountControl = this.AddForm.get('maxDiscount');

    if (this.nolimitvalue) {
      maxDiscountControl.disable();
      // Clear the value in maxDiscount control
      maxDiscountControl.setValue('');

    } else {
      // Enable the maxDiscount control
      maxDiscountControl.enable();
    }
  }
  onAllBookChange(event) {
    this.isAllBookOffer = event.value;
  }

  onLimitedBookChange(event) {
    this.isLimitedBookOffer = event.value;
    this.isNoOfBooksNeeded = event.checked;
    console.log(event);
  }

  get getSearchControl() {
    return this.AddForm.controls;
  }
  private AddImage() {
    if (this.selectedFiles.length > 0) {
      this.offerService.addImage(this.selectedFiles[0]).subscribe({
        next: (response) => {
          this.offerDetails.offerImage = response.publicId;
          this.submitOffer();
        },
        error: (err) => {
          this.offerDetails.offerImage = null;
          this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
        }
      });

    }
    else {
      this.offerDetails.offerImage = null;
      this.submitOffer();
    }
  }
}
