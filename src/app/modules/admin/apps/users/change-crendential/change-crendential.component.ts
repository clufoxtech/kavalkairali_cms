import { Component, Input, OnInit } from '@angular/core';
import { CredentialModel } from '../UserModels/CredentialModel';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
@Component({
  selector: 'app-change-crendential',
  templateUrl: './change-crendential.component.html',
  styleUrls: ['./change-crendential.component.scss']
})
export class ChangeCrendentialComponent implements OnInit {
  @Input() CredentialValue:CredentialModel;
  Credential:boolean=false;
  CredentialDetails:CredentialModel;
  constructor(private Aroute: ActivatedRoute,private router: Router,private userService:UserserviceService) { }

  ngOnInit(): void {
    this.Aroute.params.subscribe(params => {
      this.CredentialDetails=new CredentialModel();
      this.CredentialDetails.id=params['id'];
      this.CredentialDetails.visible=params['visible'];
      this.CredentialDetails.username=params['username'];
      this.GeneratePassword();
    });
  }
  Cancel(){
    this.router.navigate([`apps/users/userlist/`,]);
  }
  GeneratePassword(){
    this.userService.generatePassword().subscribe((response)=>{
      this.CredentialDetails.password=response.password;
       })  
  }
  ChangePassword(){
    this.userService.changePassword(this.CredentialDetails.id,this.CredentialDetails.password).subscribe((response)=>{
      this.CredentialDetails.password=response.password;
      this.router.navigate([`/sign-in`,]);
       }) 
  }
}
