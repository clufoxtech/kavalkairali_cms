export class CustomerDetails{
    public id:string;
    public name:string;
    public email:string;
    public phone:number;
    public subscriptionStatus:string;
    public loyalty:string;
    public creationTimestamp:any;
    public age:number;
    public gender:string;
    public location :string;
    public merketingEnabled:string;
    public channel:string;
    public dob:Date;
    public totalOrders:number;
    public loyaltyCard:LoyaltyDetails;
    public addresses:Array<AddressDetails>;
    public orders:Array<OrderDetails>;
    public totalOrderValue:number;
    public totalOrderCount:number;
    public totalBookCount:number;
}
export class LoyaltyDetails{
    public id:number;
    public status:string;
    public points:number;
    public cardNumber:number;
    public creationTimestamp:Date;
    public updationTimestamp:Date;
}
export class AddressDetails{
    public id:number;
    public name:string;
    public addressLine1:string;
    public addressLine2:string;
    public city:string;
    public state:string;
    public country:string;
    public pincode:number;
    public creationTimestamp:Date;
    public updationTimestamp:Date;
}
export class OrderDetails{
    public id:number;
    public orderNUmber:number;
    public amount:number;
    public status:string;
    public channel:string;
    public creationTimestamp:Date;
    public updationTimestamp:Date;
}