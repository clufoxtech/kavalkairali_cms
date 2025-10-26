import { Route, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { NgModule } from '@angular/core';
import { AddArticleComponent } from './add-article/add-article.component';

export const ArticleRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'articles',
        data:{
            breadCrum:'Articles'
        }
    },
    {
        path     : 'articles',
        component: ArticlesComponent,
        data:{
            breadCrum:'articles'
        }
    },
    {
        path: 'addArticle',
        component: AddArticleComponent,
        data: {
          breadCrum: 'Add Ariticle'
        }
      },
];
@NgModule({
  imports: [RouterModule.forChild(ArticleRoutes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
