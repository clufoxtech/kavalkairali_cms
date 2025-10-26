import { Route } from '@angular/router';
import { ChangeCrendentialComponent } from './change-crendential/change-crendential.component';
import { DepartmentsComponent } from './departments/departments.component';
import { EditrolesComponent } from './editroles/editroles.component';
import { RolesComponent } from './roles/roles.component';
import { UserlistComponent } from './userlist/userlist.component';
export const usersRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'userlist',
        data:{
            breadCrum:'UserList'
        }
    },
    {
        path     : 'userlist',
        component: UserlistComponent,
        data:{
            breadCrum:'UserList'
        }
    },
    {
        path     : 'roles',
        component:RolesComponent,
        data:{
            breadCrum:'Roles'
        }
    },
    {
        path     : 'departments',
        component: DepartmentsComponent,
        data:{
            breadCrum:'Department'
        }
    },
    {
        path     : 'ChangeCredential',
        component: ChangeCrendentialComponent,
         data:{
            breadCrum:'Change Credential'
        }
    },
    {
        path     : 'EditRoles',
        component:EditrolesComponent,
        data:{
           breadCrum:'Edit Roles'
       }
    }
];