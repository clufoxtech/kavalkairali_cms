import { Route, RouterModule } from '@angular/router';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { NgModule } from '@angular/core';


export const HomeScreenRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'homescreen',
        data:{
            breadCrum:'Home screen'
        }
    },
    {
        path     : 'homescreen',
        component: HomescreenComponent,
        data:{
            breadCrum:'home screen'
        }
    },

];
@NgModule({
  imports: [RouterModule.forChild(HomeScreenRoutes)],
  exports: [RouterModule]
})
export class HomeScreenRoutingModule { }
