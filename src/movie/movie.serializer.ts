import { Expose, Exclude } from 'class-transformer';

export class MovieOmdbEntity {
  @Expose({ name: 'Title' })
  title: string;

  @Expose({ name: 'Released' })
  released: string;

  @Expose({ name: 'Runtime' })
  runtime: string;

  @Expose({ name: 'Genre' })
  genre: string;

  @Expose({ name: 'Director' })
  director: string;

  @Expose({ name: 'Writer' })
  writer: string;

  @Expose({ name: 'Actors' })
  actors: string;

  @Expose({ name: 'Plot' })
  plot: string;

  @Expose({ name: 'Language' })
  language: string;

  @Expose({ name: 'Country' })
  country: string;

  @Expose({ name: 'Awards' })
  awards: string;

  @Expose({ name: 'Poster' })
  poster: string;

  @Exclude()
  Ratings: Array<object>;

  @Exclude()
  imdbVotes: string;

  @Exclude()
  Year: string;

  @Exclude()
  Related: string;

  @Exclude()
  Metascore: string;

  @Exclude()
  imdbRating: string;

  @Exclude()
  imdbID: string;

  @Exclude()
  Type: string;

  @Exclude()
  DVD: string;

  @Exclude()
  BoxOffice: string;

  @Exclude()
  Production: string;

  @Exclude()
  Website: string;

  @Exclude()
  Response: string;
}
