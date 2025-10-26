import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialModel } from '../UserModels/CredentialModel';
import { UserDetails } from '../UserModels/UserDetailModel';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() product: UserDetails;
  public CrententailDetails:CredentialModel;
  @Output() Credential=new EventEmitter<boolean>();
  public userdetails:boolean=true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  DetailsCancel(){
    console.log(false);
    this.Credential.emit(false); 
  }
  ChangeCredential(username,id){
    this.CrententailDetails=new CredentialModel();
    this.CrententailDetails.visible=true;
    this.CrententailDetails.username=username;
    this.CrententailDetails.id=id;
   this.Credential.emit(false); 
   this.router.navigate([`apps/users/ChangeCredential/`,this.CrententailDetails],{skipLocationChange:true});

  }
}
