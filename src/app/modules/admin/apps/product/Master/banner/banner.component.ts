import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../product.service';
import { CampaignService } from '../../../Campaigns/campaign.service';
import { OfferList } from '../../../Campaigns/CampaignModel/coupon';

@Component({
  providers: [MessageService],
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
public imageurl:string;
public imageFiles: Array<any>;
public selectedFiles:File;
public inputid:any;
public ValidImage:boolean=true;
public printbannerlist:Array<any>;
public ebookbannerlist:Array<any>;
public audiobannerlist:Array<any>;
public sortedEbookBanners: Array<any>=[];
public sortedPrintBanners: Array<any>=[];
public sortedAudioBanners: Array<any>=[];
public printofferList:Array<OfferList>;
public ebookofferList:Array<OfferList>;
public audioofferList:Array<OfferList>;
public offerlist:Array<OfferList>;
public status :string;
public selectedCover:any;
AddPrintForm!: FormGroup;
AddEbookForm!: FormGroup;
AddAudioForm!: FormGroup;
public index:number;
  constructor(private messageService: MessageService,public campaignservice:CampaignService,public formBuilder: FormBuilder,public addservice:ProductService) { }

  ngOnInit(): void {
 this.index=0;
 this.status='PRINT'; 
    this.GetPrintBanner();
    this.GetOffer(this.status).then(() => {
      this.printofferList=new Array<OfferList>();
    this.printofferList=this.offerlist;
    })
 
  
  
  // Usage
  
  // Add more image input and remove button pairs as needed.
  
  this.AddPrintForm = this.formBuilder.group({
    image1:['',],
    image2:['',],
    image3:['',],
    image4:['',],
    PisOfferCheckbox1:[false,],
    PisOfferCheckbox2:[false,],
    PisOfferCheckbox3:[false,],
    PisOfferCheckbox4:[false,],
    Pdropdown1:['',],
    Pdropdown2:['',],
    Pdropdown3:['',],
    Pdropdown4:['',],
  })
  this.AddEbookForm = this.formBuilder.group({
    image1: [''],
      image2: [''],
      image3: [''],
      image4: [''],
    
    EisOfferCheckbox1:[false,],
    EisOfferCheckbox2:[false,],
    EisOfferCheckbox3:[false,],
    EisOfferCheckbox4:[false,],
    Edropdown1:['',],
    Edropdown2:['',],
    Edropdown3:['',],
    Edropdown4:['',],
  }) 
  this.AddAudioForm = this.formBuilder.group({
    image1:['',],
    image2:['',],
    image3:['',],
    image4:['',],
    
    AisOfferCheckbox1:[false,],
    AisOfferCheckbox2:[false,],
    AisOfferCheckbox3:[false,],
    AisOfferCheckbox4:[false,],
    Adropdown1:['',],
    Adropdown2:['',],
    Adropdown3:['',],
    Adropdown4:['',],
  }) 
  this.sortedEbookBanners = Array(4).fill({});
  }
 
  handleTab(e){ 
    this.index=e.index; 
    if(this.index==0){
      this.status='PRINT';
      this.GetPrintBanner();
      this.GetOffer(this.status).then(() => {
        this.printofferList=new Array<OfferList>();
      this.printofferList=this.offerlist;
      })
     
    }
    else if(this.index==1){
      this.status='EBOOK';
      this.GetEbookBanner();
      this.GetOffer(this.status).then(() => {
        this.ebookofferList=new Array<OfferList>();
        this.ebookofferList=this.offerlist;
      })
     
    }
    else if(this.index==2){
      this.status='AUDIO';
      this.GetAudioBanner();
      this.GetOffer(this.status).then(() => {
        this.audioofferList=new Array<OfferList>();
      this.audioofferList=this.offerlist;
      })
      
    }
   
  }
  
  GetOffer(status): Promise<any>{
    return new Promise<any[]>((resolve, reject) => {
    this.offerlist=new Array<OfferList>();
    this.campaignservice.getOfferList(status,'ACTIVE',0,500).subscribe({
      next: (response)=>{
       
        this.offerlist=response.content;
        resolve(this.offerlist)
      },
      error: (err) => {
        this.offerlist=[]
      
      }
    })
  })  
  }
  GetPrintBanner(){
    this.imageFiles=[];
    this.addservice.getBanner('PRINT').subscribe({
      next: (response)=>{
         this.printbannerlist=response;
         this.imageFiles = this.printbannerlist.map(item => ({
          publicId: item.publicId,
          position: item.position,
          offerId:item.offerId
      }));
      this.sortedPrintBanners = this.imageFiles.sort((a, b) => a.position - b.position);
         
      },
      error: (err) => {
       
      
      }
    }) 
  }
  GetEbookBanner(){
    this.imageFiles=[];
    this.addservice.getBanner('EBOOK').subscribe({
      next: (response)=>{
         this.ebookbannerlist=response;
         this.imageFiles = this.ebookbannerlist.map(item => ({
          publicId: item.publicId,
          position: item.position,
          offerId:item.offerId
      }));
      this.sortedEbookBanners = this.imageFiles.sort((a, b) => a.position - b.position);
     
         
      },
      error: (err) => {
       
      
      }
    }) 
  }
  getBannerImage(position: number, tab: string): string {
    let banners;
    switch (tab) {
        case 'Print':
            banners = this.sortedPrintBanners;
            break;
        case 'Ebook':
            banners = this.sortedEbookBanners;
            break;
        case 'Audio':
            banners = this.sortedAudioBanners;
            break;
        default:
            return '';
    }

    const banner = banners.find(banner => banner.position === position);
    return banner ? 'https://apps.dcbooks.com/uploads/image/' + banner.publicId : '';
}

  GetAudioBanner(){
    this.imageFiles=[];
    this.addservice.getBanner('AUDIO').subscribe({
      next: (response)=>{
         this.audiobannerlist=response;
         if(this.audiobannerlist){
         this.imageFiles = this.audiobannerlist.map(item => ({
          publicId: item.publicId,
          position: item.position,
          offerId:item.offerId
      }));
      this.sortedAudioBanners = this.imageFiles.sort((a, b) => a.position - b.position);
    } 
      },
      error: (err) => {
       
      
      }
    }) 
  }
  removeBanner(index: number, tab: string) {
    let bannerList;
    switch (tab) {
        case 'Print':
            bannerList = this.printbannerlist;
            break;
        case 'Ebook':
            bannerList = this.ebookbannerlist;
            break;
        case 'Audio':
            bannerList = this.audiobannerlist;
            break;
        default:
            bannerList = [];
    }

    bannerList.splice(index, 1);

    switch (tab) {
        case 'Print':
            this.sortedPrintBanners = bannerList.sort((a, b) => a.position - b.position);
            break;
        case 'Ebook':
            this.sortedEbookBanners = bannerList.sort((a, b) => a.position - b.position);
            break;
        case 'Audio':
            this.sortedAudioBanners = bannerList.sort((a, b) => a.position - b.position);
            break;
        default:
            break;
    }
}  

 onFileSelected(event: any, position: number, tab: string) {
    const file: File = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Update image preview
            const previewId = `${tab}ImgPreview${position}`;
            const previewElement = document.getElementById(previewId);
            if (previewElement) {
                previewElement.setAttribute('src', reader.result as string);
            }

            // Upload the file
            if (file) {
                this.addservice.addImage(file).subscribe({
                    next: (response) => {
                        const selectedCover = response.publicId;
                        // Add the file to the corresponding banner list
                        let bannerList;
                        switch (tab) {
                            case 'Print':
                                bannerList = this.sortedPrintBanners;
                                break;
                            case 'Ebook':
                                bannerList = this.sortedEbookBanners;
                                break;
                            case 'Audio':
                                bannerList = this.sortedAudioBanners;
                                break;
                            default:
                                bannerList = [];
                        }
                        const bannerIndex = bannerList.findIndex(banner => banner.position === position);
                        if (bannerIndex !== -1) {
                            bannerList[bannerIndex].publicId = selectedCover;
                        } else {
                            bannerList.push({ publicId: selectedCover, position: position });
                        }
                    },
                    error: (err) => {
                        this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
                    }
                });
            }
        };
    }
}

toggleOfferCheckbox(position: number, tab: string): void {
  let offerCheckboxValue: boolean;

  switch (tab) {
      case 'Print':
          offerCheckboxValue = this.AddPrintForm.get(`PisOfferCheckbox${position}`).value;
          break;
      case 'Ebook':
          offerCheckboxValue = this.AddEbookForm.get(`EisOfferCheckbox${position}`).value;
          break;
      case 'Audio':
          offerCheckboxValue = this.AddAudioForm.get(`AisOfferCheckbox${position}`).value;
          break;
      default:
          offerCheckboxValue = false;
  }

  if (offerCheckboxValue) {
      // If checkbox is checked, display the dropdown
      switch (tab) {
          case 'Print':
              this.AddPrintForm.get(`Pdropdown${position}`).enable();
              break;
          case 'Ebook':
              this.AddEbookForm.get(`Edropdown${position}`).enable();
              break;
          case 'Audio':
              this.AddAudioForm.get(`Adropdown${position}`).enable();
              break;
      }
  } else {
      // If checkbox is unchecked, hide the dropdown and remove offerId from the banner list
      switch (tab) {
          case 'Print':
              this.AddPrintForm.get(`Pdropdown${position}`).disable();
              this.removeOfferFromBannerList(position, tab);
              break;
          case 'Ebook':
              this.AddEbookForm.get(`Edropdown${position}`).disable();
              this.removeOfferFromBannerList(position, tab);
              break;
          case 'Audio':
              this.AddAudioForm.get(`Adropdown${position}`).disable();
              this.removeOfferFromBannerList(position, tab);
              break;
      }
  }
}

removeOfferFromBannerList(position: number, tab: string): void {
  let bannerList;
  switch (tab) {
      case 'Print':
          bannerList = this.sortedPrintBanners;
          break;
      case 'Ebook':
          bannerList = this.sortedEbookBanners;
          break;
      case 'Audio':
          bannerList = this.sortedAudioBanners;
          break;
      default:
          bannerList = [];
  }

  const bannerIndex = bannerList.findIndex(banner => banner.position === position);
  if (bannerIndex !== -1) {
      delete bannerList[bannerIndex].offerId;
  }
}
onOfferSelect(position: number, tab: string): void {
  let bannerList: Array<any>;

  switch (tab) {
      case 'Print':
          bannerList = this.sortedPrintBanners;
          break;
      case 'Ebook':
          bannerList = this.sortedEbookBanners;
          break;
      case 'Audio':
          bannerList = this.sortedAudioBanners;
          break;
      default:
          return;
  }

  const bannerIndex = bannerList.findIndex(banner => banner.position === position);
  if (bannerIndex !== -1) {
      const selectedOfferId = this.getSelectedOfferId(position, tab);
      if (selectedOfferId) {
          bannerList[bannerIndex].offerId = selectedOfferId;
      }
  }
  else{
    this.messageService.add({severity:'warnuii', summary:'Add banner first', detail:'Please add banner for adding the offer'}); 
  }
}
getIsOfferChecked(position: number, tab: string): boolean {
  let bannerList: Array<any>;

  switch (tab) {
      case 'Print':
          bannerList = this.sortedPrintBanners;
          break;
      case 'Ebook':
          bannerList = this.sortedEbookBanners;
          break;
      case 'Audio':
          bannerList = this.sortedAudioBanners;
          break;
      default:
          return false;
  }

  const banner = bannerList.find(banner => banner.position === position);
  return banner && banner.offerId !== null;
}

getSelectedOfferId(position: number, tab: string): string {
  let formGroup: FormGroup;
  switch (tab) {
      case 'Print':
          formGroup = this.AddPrintForm;
          break;
      case 'Ebook':
          formGroup = this.AddEbookForm;
          break;
      case 'Audio':
          formGroup = this.AddAudioForm;
          break;
      default:
          return '';
  }

  const dropdownControl = formGroup.get(`${tab.charAt(0)}dropdown${position}`);
  return dropdownControl ? dropdownControl.value : '';
}
getOfferId(position: number, tab: string): number | null {
  let bannerList: Array<any>;

  switch (tab) {
      case 'Print':
          bannerList = this.sortedPrintBanners;
          break;
      case 'Ebook':
          bannerList = this.sortedEbookBanners;
          break;
      case 'Audio':
          bannerList = this.sortedAudioBanners;
          break;
      default:
          return null;
  }

  const banner = bannerList.find(banner => banner.position === position);
  return banner ? banner.offerId : null;
}
  AddPrintBanner(){
    if (this.AddPrintForm.valid) {
      console.log(this.imageFiles)
       if(this.imageFiles.length>0){

        this.addservice.addBanner(this.imageFiles,this.status).subscribe({
          next: (response)=>{
           
             this.messageService.add({severity:'success', summary:'Added successfully', detail:'Added successfully'}); 
             this.GetPrintBanner();
          },
          error: (err) => {
            // if(err.error.status=409){
              this.messageService.add({severity:'error', summary:err.error.status, detail:err});
            // }
            this.GetPrintBanner();
          }
        })
         
      }
      else{
        this.messageService.add({severity:'error', summary:'Atleast one banner is required', detail:'One banner required'});
        this.GetPrintBanner();
      }
      
      
    }
  }
  AddEbookBanner(){
    if (this.AddEbookForm.valid) {
      console.log(this.imageFiles)
       if(this.imageFiles.length>0){
        this.addservice.addBanner(this.imageFiles,this.status).subscribe({
          next: (response)=>{
           
             this.messageService.add({severity:'success', summary:'Added successfully', detail:'Added successfully'}); 
             this.GetEbookBanner();
          },
          error: (err) => {
            // if(err.error.status=409){
              this.messageService.add({severity:'error', summary:err.error.status, detail:err});
            // }
            this.GetEbookBanner();
          }
        })
         
      }
      else{
        this.messageService.add({severity:'error', summary:'Atleast one banner is required', detail:'One banner required'});
        this.GetEbookBanner();
      }
      
      
    }
  }

  AddAudioBanner(){
    if (this.AddAudioForm.valid) {
      console.log(this.imageFiles)
       if(this.imageFiles.length>0){
        this.addservice.addBanner(this.imageFiles,this.status).subscribe({
          next: (response)=>{
           
             this.messageService.add({severity:'success', summary:'Added successfully', detail:'Added successfully'}); 
             this.GetAudioBanner();
          },
          error: (err) => {
            // if(err.error.status=409){
              this.messageService.add({severity:'error', summary:err.error.status, detail:err});
            // }
            this.GetAudioBanner();
          }
        })
         
      }
      else{
        this.messageService.add({severity:'error', summary:'Atleast one banner is required', detail:'One banner required'});
        this.GetAudioBanner();
      }
      
      
    }
  }
}
