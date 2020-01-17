import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Comment } from '../comment/comment.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  title: string;

  @Column()
  released: string;

  @Column()
  runtime: string;

  @Column()
  genre: string;

  @Column()
  director: string;

  @Column()
  writer: string;

  @Column()
  actors: string;

  @Column()
  plot: string;

  @Column()
  language: string;

  @Column()
  country: string;

  @Column()
  awards: string;

  @Column()
  poster: string;

  @OneToMany(
    type => Comment,
    comment => comment.movie,
  )
  comments: Array<Comment>;
}
