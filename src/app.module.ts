import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { MovieModule } from './movie/movie.module';

const PORT = process.env.PORT ? +process.env.PORT : 5432;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST || '127.0.0.1',
      port: PORT,
      username: process.env.USER_NAME || 'postgres',
      password: process.env.PASSWORD || '12345678',
      database: process.env.DATABASE || 'movie_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CommentModule,
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
