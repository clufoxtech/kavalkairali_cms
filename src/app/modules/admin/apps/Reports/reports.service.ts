import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  baseUrl:string = environment.baseUrl;
  header:any='';
  
  constructor(private httpClient: HttpClient,public authservice:AuthService) { }

  getOrders(bookType:string,startDate:Date,endDate:Date):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    console.log(this.header.Authorization)
     return this.httpClient.get(this.baseUrl+'/orders/reports?startDate='+startDate+'&endDate='+endDate+'&bookType='+bookType,{headers:this.header,withCredentials : true});
  
 }
 getBooks(selectedBook:string,bookType:string,startDate:Date,endDate:Date):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  console.log(this.header.Authorization)
   return this.httpClient.get(this.baseUrl+'/reports/books?name='+selectedBook+'&startDate='+startDate+'&endDate='+endDate+'&bookType='+bookType,{headers:this.header,withCredentials : true});
}

getAuthors(authorname:string,bookType:string,startDate:Date,endDate:Date):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  console.log(this.header.Authorization)
   return this.httpClient.get(this.baseUrl+'/reports/author?name='+authorname+'&startDate='+startDate+'&endDate='+endDate+'&bookType='+bookType,{headers:this.header,withCredentials : true});
}

}
