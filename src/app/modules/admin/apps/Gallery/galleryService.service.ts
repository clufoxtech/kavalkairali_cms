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
      return this.httpClient.get(this.baseUrl+'/galleries',{headers:this.header,withCredentials : true});
   
  }
  addGallery(imageIds:string[],title:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.post(this.baseUrl+'/galleries',{'title':title,'imageId':imageIds},{headers:this.header,withCredentials : true})
  }
  editGallery(id:number,name:string,description:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.patch(this.baseUrl+'/galleries/'+id,{'description':description,'name':name},{headers:this.header,withCredentials : true})
  }
  deleteGallery(id:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.delete(this.baseUrl+'/galleries/'+id,{headers:this.header,withCredentials : true})
  }
    addCoverImage(file: any):Observable<any>{
    var formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.baseUrl+'/uploads/images',formData,
    {headers:this.header,withCredentials : true})
  }
}