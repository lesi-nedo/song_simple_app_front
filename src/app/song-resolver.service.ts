import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of} from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

import { Song, SongImpl } from './songs/song';
import { SongService } from './song.service';

@Injectable({
  providedIn: 'root'
})
export class SongResolverService implements Resolve<Observable<Song>> {

  constructor(private song: SongService,  private router: Router) { }
  resolve(route: ActivatedRouteSnapshot): Observable<Song> | Observable<never>{
    const id = route.params['id'];
    const url = route.url.toString();
    if(id) {
      if(url === `${id},delete`){
        this.song.delete(id).subscribe({next: () =>  window.location.reload()})
        return EMPTY;
      }
      return this.song.getSong(id).pipe(
        mergeMap((song: Song) => {
          if(song) {
            return of(song);
          } else {
            this.router.navigate(['not_found']);
            return EMPTY;
          }
        })
      );
    } else {
      if(url === 'edit'){
       const songTo = new SongImpl(-1, "placeholder", "placeholder", new Date(), "placeholder",)
        return of(songTo);
      } else if(url === 'new'){
        const songTo = new SongImpl(-2, "placeholder", "placeholder", new Date(), "placeholder",)
        return of(songTo);
      }
    }
    return EMPTY;

  }
}
