import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

import { Movie } from './movie.entity';
import { plainToClass } from 'class-transformer';

import { MovieOmdbEntity } from './movie.serializer';
import { capitalize } from '../hepers/capitalize';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(movieDto) {
    let movie;

    try {
      movie = await this.movieRepository.findOne({ title: capitalize(movieDto.title) });
      console.log(movie, movieDto);

      if (!movie) {
        const { data } = await axios.get(
          `http://www.omdbapi.com/?i=tt3896198&apikey=28af393c&t=${movieDto.title}`,
        );

        movie = this.createNew(data);
      }

      return movie;
    } catch (e) {
      console.log(e);
    }
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
