import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { LoggerService } from '../logger.service';
import { Song } from './song';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  songs: Song[] = [];

  constructor(private songService: SongService, private loggingService: LoggerService) { }

  getSongs():void {
    this.songService.getAllSongs().subscribe(songs => {
      this.songs = songs});
  }


  ngOnInit(): void {
    this.getSongs();
  }

}
