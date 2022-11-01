import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Song } from '../songs/song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  @Input() song?: Song;
  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    private router: Router
  ) { }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.songService.getSong(id)
      .subscribe(song => this.song = song);
  }

  update(id:number): void {
    this.router.navigate([`${id}/edit`]);
  }
  delete(id:number): void {
    this.songService.delete(id).subscribe({
      next: () => this.router.navigate(["songs"])
    })
  }
  ngOnInit(): void {
    this.getHero();

  }

}
