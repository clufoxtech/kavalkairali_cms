import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {
 
  baseUrl:string = environment.baseUrl;
  header:any='';
  
  constructor(private httpClient: HttpClient,public authservice:AuthService) { }
 
  // Gallery Api calls
  getAllGallery():Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
      return this.httpClient.get(this.baseUrl+'/gallery',{headers:this.header,withCredentials : true});
   
  }
  addGallery(name:string,description:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.post(this.baseUrl+'/gallery',{'description':description,'name':name},{headers:this.header,withCredentials : true})
  }
  editGallery(id:number,name:string,description:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.patch(this.baseUrl+'/gallery/'+id,{'description':description,'name':name},{headers:this.header,withCredentials : true})
  }
  deleteGallery(id:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.delete(this.baseUrl+'/gallery/'+id,{headers:this.header,withCredentials : true})
  }
  
}