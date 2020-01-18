import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CommentModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
