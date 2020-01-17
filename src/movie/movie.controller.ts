import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
} from '@nestjs/common';

import { MovieDto } from './movie.dto';
import { MovieService } from './movie.service';
import { MovieMapperImpl } from './movie.mapper';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly movieMapper: MovieMapperImpl,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() movie: MovieDto): Promise<MovieDto> {
    const movieEntity = await this.movieService.create(movie);
    const movieDto = this.movieMapper.fromDomainToDto(movieEntity);

    return movieDto;
  }

  @Get()
  async getMovie(@Param('id') id: string): Promise<MovieDto> {
    const movie = await this.movieService.getMovie(id);
    const movieDto = this.movieMapper.fromDomainToDto(movie);

    return movieDto;
  }
}
