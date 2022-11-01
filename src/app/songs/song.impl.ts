import { Song } from './song';

class SongImpl implements Song {
  constructor (
    public id: number,
    public title: string,
    public author: string,
    public year_pub: Date,
    public language: string
  ) {}

}
