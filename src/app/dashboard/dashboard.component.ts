import { Component, OnInit } from '@angular/core';
import { Song } from '../songs/song';
import { SongService } from '../song.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private static BEGIN_PAGE = 0;
  private static SIZE_PAGE = 2;
  songs: Song[] = [];


  constructor(private songService : SongService) { }

  ngOnInit(): void {
   this.getSongs();
  }

  getSongs(): void {
    this.songService.getSongs(DashboardComponent.BEGIN_PAGE, DashboardComponent.SIZE_PAGE)
      .subscribe(songs => this.songs = songs);
  }

}
