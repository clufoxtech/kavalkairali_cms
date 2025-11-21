import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class HomeScreenService {
 
  baseUrl:string = environment.baseUrl;
  header:any='';
  
  constructor(private httpClient: HttpClient,public authservice:AuthService) { }
 
  // HomeScreen Api calls
  getAllHomeScreen():Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
      return this.httpClient.get(this.baseUrl+'/homeRails',{headers:this.header,withCredentials : true});
   
  }
  addHomeScreen(magazine:string,category:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.post(this.baseUrl+'/homeRails',
      {'magazine':magazine,'magazineCategory':category},
      {headers:this.header,withCredentials : true})
  }
  editHomeScreen(id:string,magazine:string,category:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.patch(this.baseUrl+'/homeRails/'+id,
       {'magazine':magazine,'magazineCategory':category},{headers:this.header,withCredentials : true})
  }
  deleteHomeScreen(id:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.delete(this.baseUrl+'/homeRails/'+id,{headers:this.header,withCredentials : true})
  }

  addCoverImage(file: any):Observable<any>{
    var formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.baseUrl+'/uploads/images',formData,
    {headers:this.header,withCredentials : true})
  }

  
}