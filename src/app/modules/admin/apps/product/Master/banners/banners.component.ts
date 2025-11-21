import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../product.service';
import { CampaignService } from '../../../Campaigns/campaign.service';
import { OfferList } from '../../../Campaigns/CampaignModel/coupon';
import { environment } from 'environments/environment';

@Component({
  providers: [MessageService],
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
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
  bannerList: any[];
  constructor(private messageService: MessageService,public campaignservice:CampaignService,public formBuilder: FormBuilder,public addservice:ProductService) { }

  ngOnInit(): void {; 
    this.GetPrintBanner();

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
 
  this.sortedEbookBanners = Array(4).fill({});
  }
 
  handleTab(e){ 

      this.GetPrintBanner();
  }

  GetPrintBanner(){
    this.imageFiles=[];
    this.addservice.getBanner('MAGAZINE').subscribe({
      next: (response)=>{
         this.printbannerlist=response;
         this.imageFiles = this.printbannerlist.map(item => ({
          publicId: item.publicId,
          position: item.position,
          imageurl:environment.baseUrl+'/uploads/image/' + item.publicId,
      }));
      if(this.imageFiles.length<4){
        const lengthToAdd = 4 - this.imageFiles.length;
        for (let i = 0; i < lengthToAdd; i++) {
          this.imageFiles.push({ publicId: '', position: this.imageFiles.length + 1 , imageurl: '', offerId:'' });
        }
      }
      console.log(this.imageFiles);
      this.imageFiles.sort((a, b) => a.position - b.position);
      this.sortedPrintBanners = this.imageFiles;
      console.log( this.sortedPrintBanners);
         
      },
      error: (err) => {
       
      
      }
    }) 
  }

  getBannerImage(position: number): string {
    let banners;

            banners = this.sortedPrintBanners;

    const banner = banners.find(banner => banner.position === position);
    return banner ? environment.baseUrl+'/uploads/image/' + banner.publicId : '';
}

  removeBanner(index: number) {
console.log(index);
console.log(this.sortedPrintBanners);
            this.sortedPrintBanners[index-1] = { publicId: '', position: index , imageurl: ''};
          console.log( this.sortedPrintBanners);
            
}  

 onFileSelected(event: any, position: number) {
  let tab = 'MAGAZINE';
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
                                           
                                this.bannerList = this.sortedPrintBanners;
                           const newCover={ publicId: selectedCover, 
                                            position: position,
                                            imageurl:environment.baseUrl+'/uploads/image/' + selectedCover};

                        const bannerIndex = this.bannerList.findIndex(banner => banner.position === position);
                      
                            this.bannerList[position-1] = newCover;
                      
                    },
                    error: (err) => {
                        this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
                    }
                });
            }
        };
    }
}

  AddPrintBanner(){
    this.bannerList = this.sortedPrintBanners;
    if (this.AddPrintForm.valid) {
      console.log(this.imageFiles)
      console.log(this.bannerList);
       if(this.bannerList.length>0){
for(let i=0;i<this.bannerList.length;i++){
  if(this.bannerList[i].publicId == ''){
    this.bannerList.splice(i,1);
    i--;
  }
  else{
this.bannerList[i].position=i+1;
  }
  }
        this.addservice.addBanner(this.bannerList,'MAGAZINE').subscribe({
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

}
