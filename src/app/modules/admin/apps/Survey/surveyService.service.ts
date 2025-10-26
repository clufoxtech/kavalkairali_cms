import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class SurveyService {
 
  baseUrl:string = environment.baseUrl;
  header:any='';
  
  constructor(private httpClient: HttpClient,public authservice:AuthService) { }
 
  // Survey Api calls
  getAllSurvey():Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
      return this.httpClient.get(this.baseUrl+'/survey',{headers:this.header,withCredentials : true});
   
  }
  addSurvey(name:string,description:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.post(this.baseUrl+'/survey',{'description':description,'name':name},{headers:this.header,withCredentials : true})
  }
  editSurvey(id:number,name:string,description:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.patch(this.baseUrl+'/survey/'+id,{'description':description,'name':name},{headers:this.header,withCredentials : true})
  }
  deleteSurvey(id:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.delete(this.baseUrl+'/survey/'+id,{headers:this.header,withCredentials : true})
  }
  
}