import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { Movie } from './movie.entity';
import { MovieDto } from './movie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() movie: MovieDto) {
    console.log(movie);
    const movieEntity = await this.movieService.create(movie);

    return movieEntity;
  }
}
