import { IsNotEmpty } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  title: string;
}
