import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
