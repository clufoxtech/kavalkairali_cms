import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  baseUrl: string = environment.baseUrl;
  header: any='';
  constructor(private httpClient: HttpClient,public authservice: AuthService){ }
  getSupport(page: number,size: number): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/supports?'+'size='+size+'&page='+page,{headers:this.header,withCredentials : true});
  
  }
  updateSupportStatus(id,status,comment: string): Observable<any>{
    return this.httpClient.put(this.baseUrl+'/supports?id='+id+'&supportStatus='+status+'&comment='+comment,{headers:this.header,withCredentials : true});
  
  }
  searchFlag(bookname: string,page: number,size: number): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/flags/search?data='+bookname+'&size='+size+'&page='+page,{headers:this.header,withCredentials : true});
  
  }
  searchSupport(emailid: string,page: number,size: number): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/supports/search?data='+emailid+'&size='+size+'&page='+page,{headers:this.header,withCredentials : true});
  }
  addPolicy(content: string, policyType: string): Observable<any>{
    return this.httpClient.post(this.baseUrl+'/webDatas', { 'type': policyType, 'content': content },{headers:this.header,withCredentials : true});
  }

  getMessages(page: number,size: number): Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/messages?'+'size='+size+'&page='+page,{headers:this.header,withCredentials : true});
  }

  addMessage(title: string, body: string): Observable<any>{
    return this.httpClient.post(this.baseUrl+'/messages', { 'title': title, 'description': body },{headers:this.header,withCredentials : true});
  }

  editMessage(id: number, title: string, body: string): Observable<any>{
    return this.httpClient.patch(this.baseUrl+'/messages/'+id, { 'title': title, 'description': body },{headers:this.header,withCredentials : true});
  }
  deleteMessage(id: number): Observable<any>{
    return this.httpClient.delete(this.baseUrl+'/messages/'+id,{headers:this.header,withCredentials : true});
  }
}
