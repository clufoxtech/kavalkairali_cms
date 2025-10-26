import { Route, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { NgModule } from '@angular/core';
import { AddSurveyComponent } from './add-survey/add-survey.component';

export const SurveyRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'survey',
        data:{
            breadCrum:'Survey'
        }
    },
    {
        path     : 'survey',
        component: SurveyComponent,
        data:{
            breadCrum:'survey'
        }
    },
    {
        path: 'addSurvey',
        component: AddSurveyComponent,
        data: {
          breadCrum: 'Add Ariticle'
        }
      },
];
@NgModule({
  imports: [RouterModule.forChild(SurveyRoutes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
