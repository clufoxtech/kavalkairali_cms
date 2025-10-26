import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferList } from '../CampaignModel/coupon';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent implements OnInit {
  constructor(private aroute: ActivatedRoute, private router: Router, private couponService:CampaignService) { }
public offerDetails:OfferList;
public offerId:number;
public data=[];
  ngOnInit(): void {
    this.offerDetails= new OfferList();
    this.aroute.params.subscribe((params) => {
      this.offerId=(params['id'])?params['id']:params['offerId'];
      localStorage.setItem('offerId',JSON.stringify(this.offerId));
    });
    console.log('offerId this.offerId:'+this.offerId);
    const id=localStorage.getItem('offerId');
    console.log('offerId:'+id);
   this.GetOfferDetails(JSON.parse(id));
  }
  GetOfferDetails(id:number){
    this.couponService.getOffer(id).subscribe((response)=>{
      console.log(response);
      //if(response._embedded.users.length>0){
        this.offerDetails= new OfferList();
        this.offerDetails=response;
        console.log(this.offerDetails);
      //}
       });
  }
}
