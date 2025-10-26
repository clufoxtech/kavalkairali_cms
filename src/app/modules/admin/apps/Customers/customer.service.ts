import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { customerSearch } from '../product/productModel/searchList';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl:string = environment.baseUrl;
  header:any='';
constructor(private httpClient: HttpClient,public authservice:AuthService){ }
  getBlockReason():Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/blockReasons',{headers:this.header,withCredentials : true});
 
}
addReason(name:string):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.post(this.baseUrl+'/blockReasons',{'name':name},{headers:this.header,withCredentials : true}); 

}
addCustomer(customer:any):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.post(this.baseUrl+'/customers/create',{'firstName':customer.firstName,'secondName':customer.secondName,'email':customer.email,'phone':customer.phone},{headers:this.header,withCredentials : true});


}
addOrder(selectedlist:any,type:string,customerid:string):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.post(this.baseUrl+'/orders/create',{'bookType':type,'customerId':customerid,'bookIds':selectedlist},{headers:this.header,withCredentials : true});


}
deleteblockedReason(id:number):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.delete(this.baseUrl+'/blockReasons/'+id,{headers:this.header,withCredentials : true});

}
editblockedReason(reason:any):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.patch(this.baseUrl+'/blockReasons/'+reason.id,{'name':reason.name},{headers:this.header,withCredentials : true});

}

getCustomerByStatus(status:string,page:number,perpage:number):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.get(this.baseUrl+'/customers/allByStatus?status='+status+'&page='+page+'&size='+perpage,{headers:this.header,withCredentials : true});

}
getAllCustomer(page:number,size:number):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.get(this.baseUrl+'/customers?page='+page+'&size='+size,{headers:this.header,withCredentials : true});

}
getCustomerDetails(id:number):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.get(this.baseUrl+'/customers/'+id,{headers:this.header,withCredentials : true});

}
getOrderDetails(id:number):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.get(this.baseUrl+'/customers/'+id+'/orders',{headers:this.header,withCredentials : true});

}
changeStatus(status:string,id:number):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.put(this.baseUrl+'/customers/changeStatus/'+id,{'status':status},{headers:this.header,withCredentials : true});

}

addBlockReason(reason:string,comment:string,id:number):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.post(this.baseUrl+'/customers/block/'+id,{'reason':reason,'comment':comment},{headers:this.header,withCredentials : true});

}
searchCustomer(searchDetails:customerSearch,page:number,perPage:number):Observable<any>{
  const size=Number(perPage)+1;
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.get(this.baseUrl+'/customers/search/allByStatus?status='+searchDetails.customerType+'&key='+searchDetails.name+'&page='+page+'&size='+size,{headers:this.header,withCredentials : true});

}

importCustomer(file:File):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  const formData: FormData = new FormData();

    formData.append('file', file);
  return this.httpClient.post(this.baseUrl+'/customers/import',formData,{headers:this.header,withCredentials : true});

}
getPurchasedBook(id:any):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.get(this.baseUrl+'/customers/'+id+'/books?&page=0&size=200',{headers:this.header,withCredentials : true});

}
}
