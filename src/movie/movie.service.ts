import axios from 'axios';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from './movie.entity';
import { plainToClass } from 'class-transformer';

import { MovieOmdbEntity } from './movie.serializer';
import { capitalize } from '../helpers/capitalize';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(title: string): Promise<Movie> {
    let movie;

    try {
      movie = await this.getByTitle(title);

      if (!movie) {
        const { data } = await axios.get(
          `http://www.omdbapi.com/?i=tt3896198&apikey=28af393c&t=${title}`,
        );

        if (data.Error) throw new Error(data.Error);

        const existingMovie = await this.getByTitle(data.Title);

        movie = existingMovie ? existingMovie : this.createNew(data);
      }

      return movie;
    } catch {
      throw new HttpException('Movie not found', 400);
    }
  }

  async getMovie(id: string): Promise<Movie> {
    try {
      const movie = await this.movieRepository.findOne(id, { relations: ['comments'] });

      return movie;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async getAll(): Promise<Array<Movie>> {
    try {
      const movies = await this.movieRepository.find();

      return movies;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  private async getByTitle(title: string) {
    return this.movieRepository.findOne({ title: capitalize(title) });
  }

  private createNew(movie) {
    try {
      const movieEntity = plainToClass(MovieOmdbEntity, movie);

      return this.movieRepository.save(movieEntity);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
