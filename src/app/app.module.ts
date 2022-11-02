import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormsModule }   from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import { SongService } from './song.service';
import { ConfigService, LoggingLevel } from './config.model';
import { HttpClientModule } from '@angular/common/http';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUpdateComponent } from './add-update/add-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function loadConfig(http: HttpClient, config: ConfigService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>(resolve => {
      http.get<ConfigService>('assets/config.json')
        .pipe(
          map((c: ConfigService) => {
            config.loggingLevel = c.loggingLevel;
            resolve(true);
          }),
          catchError(() => {
            config.loggingLevel = LoggingLevel.None;
            resolve(true);
            return of({});
          })
        ).subscribe();
    })
  }
}

@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SongDetailComponent,
    DashboardComponent,
    AddUpdateComponent,
    NotFoundComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    DatePipe,
    SongService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [HttpClient, ConfigService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
