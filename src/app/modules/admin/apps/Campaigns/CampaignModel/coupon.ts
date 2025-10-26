export class  CouponList {
    public couponId:number;
    public id:number;
    public  name: string;
    public  startDate: Date;
    public  endDate: Date;
    public  startTime: string;
    public  endTime: string;
    public eligibility:string;
    public amountOrPercentage:number;
    public userLimit:number;
    public type:string;
    public status:string;
    public description:string;
    public detail:string;
    public cid:string;
    public isNoLimit:boolean;
    public maxDiscount:number;
    public couponBookType:string;
    public individualLimit:any;
  }
  export class  OfferList {
    public couponId:number;
    public id:number;
    public  name: string;
    public  startDate: Date;
    public  endDate: Date;
    public  startTime: string;
    public  endTime: string;
    public eligibility:string;
    public amountOrPercentage:number;
    public userLimit:number;
    public type:string;
    public status:string;
    public description:string;
    public detail:string;
    public cid:string;
    public isNoLimit:boolean;
    public offerBooks:any[];
    public books:any[];
    public bookType:string;
    public offerImage:string;
    public maxDiscount:number;
    public individualLimit: string;
    public isAllBookOffer: boolean;
  }
export class  ComboOfferList {
  public id:number;
  public  name: string;
  public  startDate: Date;
  public  endDate: Date;
  public  startTime: string;
  public  endTime: string;
  public books:any[];
  public offerBooks:any[];
  public bookType:string;
  public totalPrice:number;
  public offerPrice:number;
  public allowOtherOffers:boolean;
  public description:string;
  public detail:string;
}
  export class  ActivateList {
    public id:number;
    public  startDate: Date;
    public  endDate: Date;
    public  startTime: string;
    public  endTime: string;
  }