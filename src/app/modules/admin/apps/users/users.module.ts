import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { usersRoutes } from 'app/modules/admin/apps/users/users.routing';
import { DepartmentsComponent } from './departments/departments.component';
import { RolesComponent } from './roles/roles.component';
import { UserlistComponent } from './userlist/userlist.component';

import { NewuserComponent } from './newuser/newuser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ChangeCrendentialComponent } from './change-crendential/change-crendential.component';
import { EditdepartmentComponent } from './editdepartment/editdepartment.component';

import { EditrolesComponent } from './editroles/editroles.component';

import { ToastrModule } from 'ngx-toastr';
import { CommonsModule } from 'app/shared/commons.module';


@NgModule({
  declarations: [
    DepartmentsComponent,
    RolesComponent,
    UserlistComponent,
    NewuserComponent,
    EdituserComponent,
    UserDetailsComponent,
    ChangeCrendentialComponent,
    EditdepartmentComponent,
    EditrolesComponent
  ],
  imports: [
    RouterModule.forChild(usersRoutes),
    SharedModule,
    CommonsModule,
   
    ToastrModule.forRoot()
  ]
})
export class UsersModule { }
