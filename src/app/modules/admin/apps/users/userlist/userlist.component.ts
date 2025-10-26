import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Table } from 'primeng/table';
import { OverlayPanel } from 'primeng/overlaypanel';
import { UserDetails } from '../UserModels/UserDetailModel';
import { CredentialModel } from '../UserModels/CredentialModel';
import { UserserviceService } from '../userservice.service';
import { ConfirmationService, Message } from 'primeng/api';
@Component({
  providers: [ConfirmationService],
  selector: 'userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
  
})
export class UserlistComponent implements OnInit {
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  @ViewChild('op',{static:true}) ele: ElementRef;
  @ViewChild('bl',{static:true}) bl: OverlayPanel;
  @ViewChild('al',{static:true}) al: OverlayPanel;
  constructor(private userService:UserserviceService,private confirmationService: ConfirmationService) { }
  public ActiveUserList :Array<UserDetails>=[];
  public BlockedUserList :Array<UserDetails>=[];
  public ArchivedUserList :Array<UserDetails>=[];
  public product:UserDetails;
  public UserDetail:UserDetails;
  public blockeduser:UserDetails;
  public archiveuser:UserDetails;
  msgs: Message[] = [];
  public status:string;
  public index:number;
  ngOnInit(): void {
    this.index=0;
    this.user=false;
  this.GetActiveUsers();
  this.GetBlockedUsers();
  this.GetArchivedUsers();
  }
  GetActiveUsers(){
    this.userService.getActiveUsers().subscribe((response)=>{
      //if(response._embedded.users.length>0){
        this.ActiveUserList= new Array<UserDetails>();
        this.ActiveUserList=response._embedded.users;
        console.log(this.ActiveUserList);
      //} 
       })
  }
  GetBlockedUsers(){
    this.userService.getBlockedUsers().subscribe((response)=>{
     // if(response._embedded.users.length>0){
      this.BlockedUserList= new Array<UserDetails>();
      this.BlockedUserList=response._embedded.users;
      console.log(this.BlockedUserList);
      //}
       })
  }
  GetArchivedUsers(){
    this.userService.getArchivedUsers().subscribe((response)=>{
      //if(response._embedded.users.length>0){
      this.ArchivedUserList= new Array<UserDetails>();
      this.ArchivedUserList=response._embedded.users;
      console.log(this.ArchivedUserList);
      //}
       })
  }
  NewUser(){
    this.display=true;
  }
  clear(table: Table) {
    table.clear();
}
Cancel(display:any){
  this.display=display;
  this.index=0;
  this.GetActiveUsers();
  this.GetBlockedUsers();
  this.GetArchivedUsers();
}

show(event,userdetail){
  this.UserDetail=userdetail;
  this.op.show(event);
}
showBlocked(event,blockeduser){
  this.blockeduser=blockeduser;
  this.bl.show(event);
}
showArchived(event,archiveuser){
  this.archiveuser=archiveuser;
  this.al.show(event);
}

Edit(userdetails){
this.UserDetail=userdetails;
this.edit=true;
this.op.hide();
}
EditCancel(edit:any){
this.edit=edit;
this.GetActiveUsers();
this.GetBlockedUsers();
this.GetArchivedUsers();
}
ShowUser(product){
  this.product=product;
  this.user=true;
 
}
ChangeCredential(user){
this.user=user;
}
DeleteArchivedUser(archiveduser){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.userService.deleteUser(archiveduser.id).subscribe((response)=>{
        this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
        this.GetArchivedUsers();
        this.GetActiveUsers();
    this.GetBlockedUsers(); 
         })
    },
    reject: () => {
      this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      //Actual logic to perform a confirmation
  }
}); 
}

BlockUser(UserDetail){
  this.confirmationService.confirm({
    message: 'Do you want to block this record?',
    header: 'Block Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.status='BLOCKED';
  this.userService.changeStatus(UserDetail.id,this.status).subscribe((response)=>{
    this.GetActiveUsers();
    this.GetBlockedUsers(); 
    this.GetArchivedUsers();   
  })
    },
    reject: () => {
      this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      //Actual logic to perform a confirmation
  }
}); 
 
}

UnBlockUser(UserDetail){
  this.confirmationService.confirm({
    message: 'Do you want to unblock this record?',
    header: 'Unblock Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.status='ACTIVE';
  this.userService.changeStatus(UserDetail.id,this.status).subscribe((response)=>{
    this.GetBlockedUsers();  
    this.GetActiveUsers();
   
    this.GetArchivedUsers();  
  })
    },
    reject: () => {
      this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      //Actual logic to perform a confirmation
  }
}); 
 
}
ArchiveUser(archiveuser){
  this.confirmationService.confirm({
    message: 'Do you want to archive this record?',
    header: 'Archive Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.status='ARCHIVED';
  this.userService.changeStatus(archiveuser.id,this.status).subscribe((response)=>{
    this.GetActiveUsers();
    this.GetBlockedUsers(); 
    this.GetArchivedUsers();   
  })
    },
    reject: () => {
      this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      //Actual logic to perform a confirmation
  }
}); 
  
}

}
