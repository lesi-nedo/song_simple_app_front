import { Injectable } from '@angular/core';
import { Song } from './songs/song';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})

//gets songs in the pages
export class SongService {

  private static SONGS_URL = 'http://localhost:7000/song/pages'; //the url of the server to get the songs
  private static SONG_ID = 'http://localhost:7000/song';
  private static SONG_UPDATE = 'http://localhost:7000/update';


  httOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response'  as const
  }
  constructor(
    private http: HttpClient,
    private loggingService: LoggerService
  ) { }

  getAllSongs() : Observable<Song[]> {
    return this.http.get<Song[]>(`${SongService.SONG_ID}`)
    .pipe(
      tap(_ => this.loggingService.logVerbose(`fetched  all songs`)),
      catchError(this.handleError<Song[]>("getSongs", []))
    )

  }
  getSongs(fromPage = 0, pageSize = 2): Observable<Song[]> {
    return this.http.get<Song[]>(`${SongService.SONGS_URL}?fromPage=${fromPage}&pageSize=${pageSize}`)
      .pipe(
        tap(_ => this.loggingService.logVerbose(`fetched songs from page=${fromPage} page size=${pageSize}`)),
        catchError(this.handleError<Song[]>("getSongs", []))
      )
  }

  getSong(id: number): Observable<Song> {
    const url = `${SongService.SONG_ID}/${id}`;
    return this.http.get<Song>(url).pipe(
      tap(_ => this.loggingService.logVerbose(`fetched song with id=${id}`)),
      catchError(this.handleError<Song>(`getSong with id=${id}`))
    );
  }
  update (song: Song) : Observable<any>{
    return this.http
      .put<Song>(`${SongService.SONG_UPDATE}/${song.id}`, song, this.httOptions)
      .pipe(map((res: any) => console.log(res)));
  }

  create (song: Song): Observable<any> {
    return this.http
      .post<Song>(`${SongService.SONG_ID}`, song, this.httOptions)
      .pipe(map((res: any) => console.log(res)));
  }

  delete(id: number) : Observable<any> {
    return this.http
      .delete(`${SongService.SONG_ID}/${id}`)
      .pipe(map((res: any) => console.log(res)));
  }

  searchSongs(term: string) : Observable<Song[]> {
    const id =  Number(term);
    let resl :string;
    if(isNaN(id)){
      const terTrm =term.trim();
      if(!terTrm){
        return of([]);
      }
      resl = `${SongService.SONG_ID}?title=${terTrm}`;
      return this.getRespSong<Song[]>(resl, term);
    } else if(id>0) {
      resl =`${SongService.SONG_ID}/${id}`
      return this.getRespSong<Song>(resl, term).
        pipe(map(x => Array.of(x)));
    } else {
      return of([]);
    }
  }

  private handleError<T> (operation = "operation", result?: T) {
    return (error: any) : Observable<T> => {
      this.loggingService.logError(error);
      this.loggingService.logVerbose(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private getRespSong<T> (url: string, term: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      catchError(this.handleError<T>('SearchHeroes'))
    );
  }
 }
