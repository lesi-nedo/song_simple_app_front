export interface Song {
  id?: number;
  title?: string;
  author?: string;
  year_pub?: Date;
  language?: string;
}

export class SongImpl implements Song {
  constructor (
    public id: number,
    public title: string,
    public author: string,
    public year_pub: Date,
    public language: string
  ) {}

}
