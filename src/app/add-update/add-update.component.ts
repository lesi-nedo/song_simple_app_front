import { SongImpl } from '../songs/song';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { SongService } from '../song.service';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DatePipe } from '@angular/common';


import { Song } from '../songs/song';


@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css']
})
export class AddUpdateComponent implements OnInit {
  isSaving = false;
  searchById=false;
  id_song: number = 0;
  addUpdateForm = this.fb.group({
    title: [''],
    author: [''],
    year_pub: ['', Validators.required],
    language: ['']
  })

  constructor(
    private songServ: SongService,
    private activRoute: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router
    ) { }

  onSubmit() {
    this.isSaving =true;
    const song = this.createFromForm();
    if(song.id === 0){
      this.subToSaveResp(this.songServ.create(song));
    } else {
      this.subToSaveResp(this.songServ.update(song));
    }
  }

  ngOnInit(): void {
this.activRoute.data.subscribe(
  ({song}) => {
    //if id === -1 it means that the user does not have an id so it gives a search bar
    //if id === -2 it means the user wants to create a new song
    //if id >= 0 it means that user has an id and he wants to modify it
   if(song.id === -1){
    this.searchById = true;
   } else if(song.id >= 0){
    this.updateForm(song);
   }
  })
  }

  private updateForm(song: Song) {
    this.id_song = song.id as number;
    this.addUpdateForm.patchValue({
      title: song.title,
      author: song.author,
      year_pub: this.datePipe.transform(song.year_pub, "yyyy-MM-dd"),
      language: song.language
    })
  }

  private createFromForm(): Song {
    console.log();
    return new SongImpl(this.id_song, this.addUpdateForm.get('title')!.value!, this.addUpdateForm.get('author')!.value!, new Date(this.addUpdateForm.get('year_pub')!.value!), this.addUpdateForm.get('language')!.value!);
  }

  private subToSaveResp(result: Observable<any>) {
    result.pipe(finalize(() => this.onSaveFin())).subscribe({
      next: () => this.onSaveSuccess(),
      error: (err) => this.onSaveError(err)
  })
  }

  private onSaveFin() {
    this.isSaving = false;
  }

  protected onSaveSuccess(): void {
    this.router.navigate(["songs"]);
  }

  protected onSaveError(err: any): void {
    console.log(err);
  }
}
