import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Movie } from '../movie/movie.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(
    type => Movie,
    movie => movie.comments,
  )
  movie: Movie;
}
