import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GalleryComponent } from './gallery/gallery.component';
import { AddGalleryComponent } from './add-gallery/add-gallery.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';

export const GalleryRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'gallery',
        data:{
            breadCrum:'Gallery'
        }
    },
    {
        path     : 'gallery',
        component: GalleryComponent,
        data:{
            breadCrum:'gallery'
        }
    },
    {
        path     : 'add-gallery',
        component: AddGalleryComponent,
        data:{
            breadCrum:'add gallery'
        }
    },
    {
        path     : 'video-gallery',
        component: VideoGalleryComponent,
        data:{
            breadCrum:'video gallery'
        }
    }
];
@NgModule({
  imports: [RouterModule.forChild(GalleryRoutes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
