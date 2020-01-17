import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

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

  async create(movieDto) {
    let movie;

    try {
      movie = await this.getByTitle(movieDto.title);

      if (!movie) {
        const { data } = await axios.get(
          `http://www.omdbapi.com/?i=tt3896198&apikey=28af393c&t=${movieDto.title}`,
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
    } catch (e) {
      console.log(e);
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
      console.log(error);
    }
  }
}
