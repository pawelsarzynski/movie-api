import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MovieDto } from './movie.dto';
import { MovieService } from './movie.service';
import { MovieMapperImpl } from './movie.mapper';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly movieMapper: MovieMapperImpl,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body('title') title: string): Promise<MovieDto> {
    const movieEntity = await this.movieService.create(title);
    const movieDto = this.movieMapper.fromDomainToDto(movieEntity);

    return movieDto;
  }

  @Get(':id')
  async getMovie(@Param('id') id: string): Promise<MovieDto> {
    const movie = await this.movieService.getMovie(id);
    const movieDto = this.movieMapper.fromDomainToDto(movie);

    return movieDto;
  }

  @Get()
  async getMovies(): Promise<Array<MovieDto>> {
    const movies = await this.movieService.getAll();
    const moviesDto = movies.map(movie => this.movieMapper.fromDomainToDto(movie));

    return moviesDto;
  }
}
