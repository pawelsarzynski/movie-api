import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Movie } from './movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieMapperImpl } from './movie.mapper';
import { CommentMapperImpl } from '../comment/comment.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MovieService, MovieMapperImpl, CommentMapperImpl],
  controllers: [MovieController],
})
export class MovieModule {}
