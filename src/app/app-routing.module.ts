import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SongsComponent } from './songs/songs.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import {AddUpdateComponent } from './add-update/add-update.component';
import { SongResolverService } from './song-resolver.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: DashboardComponent},
  {path: 'detail/:id', component: SongDetailComponent},
  {path: 'songs', component: SongsComponent},
  {path: 'not_found', component: NotFoundComponent},
  {
    path: ':id/edit',
    component: AddUpdateComponent,
    resolve: {
      song: SongResolverService
    }
  },
  {
    path: 'new',
    component: AddUpdateComponent,
    resolve: {
      song: SongResolverService
    }
  },
  {
    path: 'edit',
    component: AddUpdateComponent,
    resolve: {
      song: SongResolverService
    },
  },
  {
    path: ':id/delete',
    component: AddUpdateComponent,
    resolve: {
      song: SongResolverService
    }
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
