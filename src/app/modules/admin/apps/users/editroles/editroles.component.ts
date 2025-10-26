import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentList } from '../UserModels/DepartmentModel';
import { RoleList } from '../UserModels/Rolelist';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-editroles',
  templateUrl: './editroles.component.html',
  styleUrls: ['./editroles.component.scss']
})
export class EditrolesComponent implements OnInit {
  @Output() edit =new EventEmitter<boolean>();
  public close:boolean=false;
  public roles:RoleList;
  public groupname:any;
  public val:boolean=false;
  public data = [];
  public data2 = [];
  public data3 = [];
  public data4 = [];
  public data5 = [];
  public data6 = [];
  public data7 = [];
  public data8 = [];
  public data9 = [];
  public data10=[];
  public data11=[];
  public finalarray=[];
  public privilagearray=[];
  public roleid:number;
  constructor(private Aroute: ActivatedRoute,private router: Router,private userService:UserserviceService) { }

  ngOnInit(): void {
    this.val=false;
    
    this.Aroute.params.subscribe(params => {
      this.roles=new RoleList();
      this.roles.type=params['type'];
      this.roles.id=params['id'];
      this.roleid=+this.roles.id;
    });
    
    this.data = [
      {categoryid:1,privilageid: 1, name: 'All rights', selected:false},
      {categoryid:1,privilageid:2, name: 'View only', selected:false},
      {categoryid:1,privilageid:3, name: 'no rights', selected:false},
     
    ];
    this.data2 = [
      {categoryid:2,privilageid: 1, name: 'All rights', selected:false},
      {categoryid:2,privilageid:2, name: 'View only', selected:false},
      {categoryid:2,privilageid:3, name: 'no rights', selected:false},
    ];
    this.data3 = [
      {categoryid:3,privilageid: 1, name: 'All rights', selected:false},
      {categoryid:3,privilageid:2, name: 'View only', selected:false},
      {categoryid:3,privilageid:3, name: 'no rights', selected:false},
    ];
    this.data4 = [
      {categoryid:4,privilageid: 1, name: 'All rights', selected:false},
      {categoryid:4,privilageid:2, name: 'View only', selected:false},
      {categoryid:4,privilageid:3, name: 'no rights', selected:false},
    ];
    this.data5 = [
      {categoryid:5,privilageid: 1, name: 'All rights', selected:false},
      {categoryid:5,privilageid:2, name: 'View only', selected:false},
      {categoryid:5,privilageid:3, name: 'no rights', selected:false},
    ];
    this.data6 = [
      {categoryid:6,privilageid: 1, name: 'All rights', selected:false},
      {categoryid:6,privilageid:2, name: 'View only', selected:false},
      {categoryid:6,privilageid:3, name: 'no rights', selected:false},
    ];
    this.data7 = [
      {categoryid:7,privilageid: 1, name: 'All rights', selected:false},
      {categoryid:7,privilageid:2, name: 'View only', selected:false},
      {categoryid:7,privilageid:3, name: 'no rights', selected:false},
    ];
    this.data8 = [
      {categoryid:8,privilageid: 1, name: 'All rights', selected:false},
      {categoryid:8,privilageid:2, name: 'View only', selected:false},
      {categoryid:8,privilageid:3, name: 'no rights', selected:false},
    ];
    this.data9 = [
      {categoryid:9,privilageid: 1, name: 'All rights', selected:false},
      {categoryid:9,privilageid:2, name: 'View only', selected:false},
      {categoryid:9,privilageid:3, name: 'no rights', selected:false},
    ];
    this.data10 = [
      {categoryid:10,privilageid: 1, name: 'All rights', selected:false},
      {categoryid:10,privilageid:2, name: 'View only', selected:false},
      {categoryid:10,privilageid:3, name: 'no rights', selected:false},
    ];
    this.data11 = [
      {categoryid:11,privilageid: 1, name: 'All rights', selected:false},
      {categoryid:11,privilageid:2, name: 'View only', selected:false},
      {categoryid:11,privilageid:3, name: 'no rights', selected:false},
    ];
    this.GetRolesPrivilages(this.roleid);
    console.log(this.roles);
    this.groupname=false;
  }
  GetRolesPrivilages(roleid){
    this.userService.getRolesPrivilages(roleid).subscribe((response)=>{
     this.privilagearray=response._embedded.privileges;
     if(this.privilagearray.length===36){
      this.val=true;
     }
     this.privilagearray.forEach(x=>{
      this.finalarray.push({'roleId':this.roleid,'categoryId':x.privilegeCategory_id,'privilegeId':x.privilege_id})
      this.data.forEach(y=>{
        if((y.categoryid===x.privilegeCategory_id) && (y.privilageid===x.privilege_id)){
          y.selected=true;
        }
      })
      this.data2.forEach(y=>{
        if((y.categoryid===x.privilegeCategory_id) && (y.privilageid===x.privilege_id)){
          y.selected=true;
        }
      })
      this.data3.forEach(y=>{
        if((y.categoryid===x.privilegeCategory_id) && (y.privilageid===x.privilege_id)){
          y.selected=true;
        }
      })
      
      this.data4.forEach(y=>{
        if((y.categoryid===x.privilegeCategory_id) && (y.privilageid===x.privilege_id)){
          y.selected=true;
        }
      })
      this.data5.forEach(y=>{
        if((y.categoryid===x.privilegeCategory_id) && (y.privilageid===x.privilege_id)){
          y.selected=true;
        }
      })
      this.data6.forEach(y=>{
        if((y.categoryid===x.privilegeCategory_id) && (y.privilageid===x.privilege_id)){
          y.selected=true;
        }
      })
      this.data7.forEach(y=>{
        if((y.categoryid===x.privilegeCategory_id) && (y.privilageid===x.privilege_id)){
          y.selected=true;
        }
      })
      this.data8.forEach(y=>{
        if((y.categoryid===x.privilegeCategory_id) && (y.privilageid===x.privilege_id)){
          y.selected=true;
        }
      })
      this.data9.forEach(y=>{
        if((y.categoryid===x.privilegeCategory_id) && (y.privilageid===x.privilege_id)){
          y.selected=true;
        }
      })
      this.data10.forEach(y=>{
        if((y.categoryid===x.privilegeCategory_id) && (y.privilageid===x.privilege_id)){
          y.selected=true;
        }
      })
      this.data11.forEach(y=>{
        if((y.categoryid===x.privilegeCategory_id) && (y.privilageid===x.privilege_id)){
          y.selected=true;
        }
      })
     
     })
     console.log(this.data)
       })
  }
  Cancel(){
    this.router.navigate([`apps/users/roles/`,]);
  }
  SelectAll(event){

    if (event.checked==true) {
      this.finalarray=[];
      this.data.forEach(x=>{
        x.selected=event.checked;
       this.finalarray.push({'roleId':this.roleid,'categoryId':x.categoryid,'privilegeId':x.privilageid})
      })
      this.data2.forEach(x=>{
        x.selected=event.checked;
        this.finalarray.push({'roleId':this.roleid,'categoryId':x.categoryid,'privilegeId':x.privilageid})
      })
      this.data3.forEach(x=>{
        x.selected=event.checked;
        this.finalarray.push({'roleId':this.roleid,'categoryId':x.categoryid,'privilegeId':x.privilageid})
      })
      this.data4.forEach(x=>{
        x.selected=event.checked;
        this.finalarray.push({'roleId':this.roleid,'categoryId':x.categoryid,'privilegeId':x.privilageid})
      })
      this.data5.forEach(x=>{
        x.selected=event.checked;
        this.finalarray.push({'roleId':this.roleid,'categoryId':x.categoryid,'privilegeId':x.privilageid})
      })
      this.data6.forEach(x=>{
        x.selected=event.checked;
        this.finalarray.push({'roleId':this.roleid,'categoryId':x.categoryid,'privilegeId':x.privilageid})
      })
      this.data7.forEach(x=>{
        x.selected=event.checked;
        this.finalarray.push({'roleId':this.roleid,'categoryId':x.categoryid,'privilegeId':x.privilageid})
      })
      this.data8.forEach(x=>{
        x.selected=event.checked;
        this.finalarray.push({'roleId':this.roleid,'categoryId':x.categoryid,'privilegeId':x.privilageid})
      })
      this.data9.forEach(x=>{
        x.selected=event.checked;
        this.finalarray.push({'roleId':this.roleid,'categoryId':x.categoryid,'privilegeId':x.privilageid})
      })
      this.data10.forEach(x=>{
        x.selected=event.checked;
        this.finalarray.push({'roleId':this.roleid,'categoryId':x.categoryid,'privilegeId':x.privilageid})
      })
      this.data11.forEach(x=>{
        x.selected=event.checked;
        this.finalarray.push({'roleId':this.roleid,'categoryId':x.categoryid,'privilegeId':x.privilageid})
      })
      this.val=event.checked
    } 
    else {
      this.finalarray=[];
      this.data.forEach(x=>{
        x.selected=false;
      })
      this.data2.forEach(x=>{
        x.selected=false;
      })
      this.data3.forEach(x=>{
        x.selected=false;
      })
      this.data4.forEach(x=>{
        x.selected=false;
      })
      this.data5.forEach(x=>{
        x.selected=false;
      })
      this.data6.forEach(x=>{
        x.selected=false;
      })
      this.data7.forEach(x=>{
        x.selected=false;
      })
      this.data8.forEach(x=>{
        x.selected=false;
      })
      this.data9.forEach(x=>{
        x.selected=false;
      })
      this.data10.forEach(x=>{
        x.selected=false;
      })
      this.data11.forEach(x=>{
        x.selected=false;
      })
      this.val=event.checked
    }
console.log(this.finalarray)
  }
  UnselectAll(event,data){
const categoryid=data.categoryid;
const privilageid=data.privilageid;
    if(event.checked==false){
      this.val=false;
      console.log(this.finalarray)
      const index=this.finalarray.findIndex(object =>object.categoryId === categoryid && object.privilegeId===privilageid);
      console.log(index)
       this.finalarray.splice(index, 1);
       console.log(this.finalarray)
    }
    else{
     
this.finalarray.push({'roleId':this.roleid,'categoryId':categoryid,'privilegeId':privilageid})

console.log(this.finalarray)
    }
    if(this.finalarray.length===36){
      this.val=true;
     }
  }
  Save(){
    if(this.finalarray.length>0){
    this.userService.addRolePrivilleges(this.finalarray).subscribe({
      next: (response)=>{
      // if(response.sTATUS=='SUCCESS'){
        //this.GetAllDepartment();
        this.Cancel();
         //this.toastr.success('Successfully Added!', 'Success');
        // }
        // else{
        //  this.toastr.error(response.mSG,'Error')
        // }
     },
     error: (err) => {
       //this.toastr.error(err.status,'Error')
     }
   })
  }
  }
}
