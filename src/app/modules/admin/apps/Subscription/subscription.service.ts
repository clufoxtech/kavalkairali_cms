import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Subscriptionlist } from './subscriptionModel/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  baseUrl: string = environment.baseUrl;
  header: any='';

  constructor(private httpClient: HttpClient,public authservice: AuthService) { }//Language
  getSubscription(): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': 'Bearer '+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/subscriptions',{headers:this.header,withCredentials : true});
  }
  addSubscription(subscription: Subscriptionlist): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': 'Bearer '+this.authservice.accessToken });
    return this.httpClient.post(this.baseUrl+'/subscriptions',{
      'name':subscription.plan,
      'duration':subscription.duration,
      'amount':subscription.amount,
    'detail':subscription.details},
      {headers:this.header,withCredentials : true});
  }
  updateSubscription(subscription: any): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': 'Bearer '+this.authservice.accessToken });
    return this.httpClient.patch(this.baseUrl+'/subscriptions?id='+subscription.id,
      {'name':subscription.editplan,'duration':subscription.editduration,'amount':subscription.editamount,'detail':subscription.editdetails},  
      {headers:this.header,withCredentials : true});
  }
  deActivateSubscription(id: number): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': 'Bearer '+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/subscriptions/'+id+'/status?status=DE_ACTIVE',{headers:this.header,withCredentials : true});
  }
  activateSubscription(id: number): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': 'Bearer '+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/subscriptions/'+id+'/status?status=ACTIVE',{headers:this.header,withCredentials : true});
  }

}
