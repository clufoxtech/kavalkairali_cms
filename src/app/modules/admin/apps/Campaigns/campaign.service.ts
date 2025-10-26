import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ActivateList, ComboOfferList, CouponList, OfferList } from './CampaignModel/coupon';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  baseUrl: string = environment.baseUrl;
  header: any='';
  
  constructor(private httpClient: HttpClient,public authservice: AuthService) { }//Language
  getCouponsList(status: string): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/coupons/byStatus?status='+status,{headers:this.header,withCredentials : true});
  }
  getCoupon(id: number): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/coupons/'+id,{headers:this.header,withCredentials : true});
  }
    // Add images & files
    addImage(file: any): Observable<any> {
      var formData = new FormData();
      formData.append('file', file);
      return this.httpClient.post(this.baseUrl + '/uploads/images', formData, { headers: this.header, withCredentials: true });
    }
  addCoupon(couponDetail: CouponList): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.post(this.baseUrl+'/coupons/add',couponDetail,{headers:this.header,withCredentials : true});
  
  }
  editCoupon(couponDetail: CouponList): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.put(this.baseUrl+'/coupons/edit/'+couponDetail.couponId,couponDetail,{headers:this.header,withCredentials : true});
  
  }
  changeCouponStatus(couponDetail: CouponList,status): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.put(this.baseUrl+'/coupons/update/'+couponDetail.id+'?status='+status,{'startDate':couponDetail.startDate,'startTime':couponDetail.startTime,'endDate':couponDetail.endDate,'endTime':couponDetail.endTime,},{headers:this.header,withCredentials : true});
  
  }
  changeOfferStatus(offerDetail: ActivateList,status): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.put(this.baseUrl+'/offers/update/'+offerDetail.id+'?status='+status,{'startDate':offerDetail.startDate,'startTime':offerDetail.startTime,'endDate':offerDetail.endDate,'endTime':offerDetail.endTime,},{headers:this.header,withCredentials : true});
  
  }
  changeComboStatus(comboDetail: ComboOfferList,status): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.put(this.baseUrl+'/comboOffers/update/'+comboDetail.id+'?status='+status,{'startDate':comboDetail.startDate,'startTime':comboDetail.startTime,'endDate':comboDetail.endDate,'endTime':comboDetail.endTime,},{headers:this.header,withCredentials : true});
  
  }
  getOfferList(bookType: string,status: string,page: number,perPage: number): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/offers/byStatus?status='+status+'&bookType='+bookType+'&page='+page+'&size='+perPage,{headers:this.header,withCredentials : true});
  }
  getOffer(id: number): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/offers/'+id,{headers:this.header,withCredentials : true});
  }
  addOffer(offerDetail: OfferList): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.post(this.baseUrl+'/offers/add',offerDetail,{headers:this.header,withCredentials : true});
  
  }
  editOffer(offerDetail: OfferList): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.put(this.baseUrl+'/offers/edit/'+offerDetail.id,offerDetail,{headers:this.header,withCredentials : true});
  
  }
  deleteOffer(id: number){
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.delete(this.baseUrl+'/offers/'+id,{headers:this.header,withCredentials : true});
  }
  getComboOffer(status: string,page: number,perPage: number): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/comboOffers/byStatus?status='+status+'&page='+page+'&size='+perPage,{headers:this.header,withCredentials : true});
  
  }
  addCombo(comboDetail: ComboOfferList): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.post(this.baseUrl+'/comboOffers/add',comboDetail,{headers:this.header,withCredentials : true});
  
  }
  editCombo(offerDetail: ComboOfferList): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.put(this.baseUrl+'/comboOffers/edit/'+offerDetail.id,offerDetail,{headers:this.header,withCredentials : true});
  
  }
  deleteCoupon(id: number){
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.delete(this.baseUrl+'/coupons/'+id,{headers:this.header,withCredentials : true});
  }
}
