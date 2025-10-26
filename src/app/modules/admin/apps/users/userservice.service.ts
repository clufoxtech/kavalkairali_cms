import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { UserDetails } from './UserModels/UserDetailModel';
import * as FileSaver from 'file-saver';
import { AuthService } from 'app/core/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
 
  baseUrl:string = environment.baseUrl;
  header:any='';
  
  constructor(private httpClient: HttpClient,public authservice:AuthService) { }
  //User APi calls
  
  getActiveUsers():Observable<any>{
   console.log(this.authservice.accessToken)
   this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
   console.log(this.header.Authorization)
    return this.httpClient.get(this.baseUrl+'/users/search/allByStatus?status=ACTIVE',{headers:this.header,withCredentials : true});
 
}
getBlockedUsers():Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.get(this.baseUrl+'/users/search/allByStatus?status=BLOCKED',{headers:this.header,withCredentials : true});

}
getArchivedUsers():Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.get(this.baseUrl+'/users/search/allByStatus?status=ARCHIVED',{headers:this.header,withCredentials : true});

}
addUsers(userlist:UserDetails):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.post(this.baseUrl+'/users',{'name':userlist.name,'email':userlist.email,'phone':userlist.phone,'password':userlist.password,'status':userlist.status,'department':userlist.department,'role':userlist.role},{headers:this.header,withCredentials : true});

}
editUserDetails(userlist:UserDetails):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.patch(this.baseUrl+'/users/'+userlist.id,{'name':userlist.name,'phone':userlist.phone,'role':userlist.role,'department':userlist.department},{headers:this.header,withCredentials : true});

}
deleteUser(id:string):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.delete(this.baseUrl+'/users/'+id,{headers:this.header,withCredentials : true})
}
changeStatus(id:string,status:string):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.put(this.baseUrl+'/users/changeStatus/'+id,{ 'status':status},{headers:this.header,withCredentials : true})
}
generatePassword():Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.get(this.baseUrl+'/users/generatePassword',{headers:this.header,withCredentials : true})
}
changePassword(id:number,password:string):Observable<any>{
  this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
  return this.httpClient.put(this.baseUrl+'/users/changePassword/'+id,{'password':password},{headers:this.header,withCredentials : true})
}
  // Department Api calls
  getAllDepartments():Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
      return this.httpClient.get(this.baseUrl+'/departments',{headers:this.header,withCredentials : true});
   
  }
  addDepartments(name:string,description:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.post(this.baseUrl+'/departments',{'description':description,'name':name},{headers:this.header,withCredentials : true})
  }
  editDepartments(id:number,name:string,description:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.patch(this.baseUrl+'/departments/'+id,{'description':description,'name':name},{headers:this.header,withCredentials : true})
  }
  deleteDepartments(id:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.delete(this.baseUrl+'/departments/'+id,{headers:this.header,withCredentials : true})
  }
  //Roles API
  getRoles():Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/roles',{headers:this.header,withCredentials : true})
  }
  addRoles(type:string,description:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.post(this.baseUrl+'/roles',{'description':description,'type':type},{headers:this.header,withCredentials : true})
  }
  editRoles(id:any,type:string,description:string):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.patch(this.baseUrl+'/roles/'+id,{'description':description,'type':type},{headers:this.header,withCredentials : true})
  }
  deleteRoles(id:string):Observable<any>{
    return this.httpClient.delete(this.baseUrl+'/roles/'+id,{headers:this.header,withCredentials : true})
  }
  getRolesPrivilages(roleid):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl+'/roles/'+roleid+'/privilegeIds',{headers:this.header,withCredentials : true})
  }
  addRolePrivilleges(finallist:any):Observable<any>{
    this.header = new HttpHeaders({ 'Authorization': `Bearer `+this.authservice.accessToken });
    return this.httpClient.post(this.baseUrl+'/rolePrivilegePrivilegeCategories',finallist,{headers:this.header,withCredentials : true})
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
