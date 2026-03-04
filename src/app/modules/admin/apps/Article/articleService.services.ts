import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { ArticleList } from './articleModel';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
 
  baseUrl:string = environment.baseUrl;
  header:any='';
  
  constructor(private httpClient: HttpClient,public authservice:AuthService) { }
 
  // Article Api calls
  getAllArticles():Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
      return this.httpClient.get(this.baseUrl+'/articles',{headers:this.header,withCredentials : true});
   
  }
  addArticles(name:string,description:string, author:string, imageId: string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.post(this.baseUrl+'/articles',
      {'description':description,'title':name, 'author':author, 'coverId':imageId},
      {headers:this.header,withCredentials : true})
  }
  editArticles(id:string,title:string,description:string, author:string, imageId: string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.patch(this.baseUrl+'/articles/'+id,
      {'description':description,'title':title,'author':author, 'coverId':imageId},{headers:this.header,withCredentials : true})
  }
  deleteArticles(id:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.delete(this.baseUrl+'/articles/'+id,{headers:this.header,withCredentials : true})
  }

  addCoverImage(file: any):Observable<any>{
    var formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.baseUrl+'/uploads/images',formData,
    {headers:this.header,withCredentials : true})
  }

  
}