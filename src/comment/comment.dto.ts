import { IsNotEmpty } from 'class-validator';

export class CommentDto {
  id: number;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  movie: number;
}
