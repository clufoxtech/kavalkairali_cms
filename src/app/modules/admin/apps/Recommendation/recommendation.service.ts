import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { BookDetails } from '../product/productModel/bookdetails';
import { MultipleSearch } from './ModelRecommendation/MultipleSearch';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  baseUrl:string = environment.baseUrl;
  header:any='';
  constructor(private httpClient: HttpClient){ }
  MultisearchBook(page: number, perPage: number, searchDetails?: MultipleSearch):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/books/searchMultiple?page='+page+'&size='+perPage,{'bookType':searchDetails.bookType,'category':searchDetails.category,'title':searchDetails.title,'author':searchDetails.author},{headers:this.header,withCredentials : true});
  
  }
  addRecommendation(list:any[],booktype:string,recommendationType:string):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/recommendations?type='+booktype+'&recommendationType='+recommendationType,list,{headers:this.header,withCredentials : true});
  
  }
  getRecommendation(booktype:string,recommendationType:string):Observable<any>{
    return this.httpClient.get(this.baseUrl+'/books/byRecommendation?type='+booktype+'&recommendationType='+recommendationType,{headers:this.header,withCredentials : true});
  
  }
  addRecommendationPosition(bookdetails:BookDetails,position:number,recommendationType):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/recommendations/update?type='+bookdetails.bookType+'&recommendationType='+recommendationType,{'id':bookdetails.id,'position':position},{headers:this.header,withCredentials : true});
  
  }
  removeRecommendation(bookdetail:BookDetails,recommendationType):Observable<any>{
    return this.httpClient.delete(this.baseUrl+'/recommendations/'+bookdetail.id+'?type='+bookdetail.bookType+'&recommendationType='+recommendationType,{headers:this.header,withCredentials : true});
  
  }
}
