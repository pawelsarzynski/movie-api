import { IsNotEmpty } from 'class-validator';
import { CommentDto } from '../comment/comment.dto';

export class MovieDto {
  @IsNotEmpty()
  title: string;

  id: number;

  released: string;

  runtime: string;

  genre: string;

  director: string;

  writer: string;

  actors: string;

  plot: string;

  language: string;

  country: string;

  awards: string;

  poster: string;

  comments: Array<CommentDto>;
}
