import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl:string = environment.baseUrl;
  header:any='';
  
  constructor(private httpClient: HttpClient,public authservice:AuthService) { }

  getDailyOrders():Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    console.log(this.header.Authorization)
     return this.httpClient.get(this.baseUrl+'/dashboard/daily',{headers:this.header,withCredentials : true});
  
 }
 getWeeklyOrders():Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  console.log(this.header.Authorization)
   return this.httpClient.get(this.baseUrl+'/dashboard/weekly',{headers:this.header,withCredentials : true});

}
getMonthlyOrders():Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  console.log(this.header.Authorization)
   return this.httpClient.get(this.baseUrl+'/dashboard/monthly',{headers:this.header,withCredentials : true});

}
}
