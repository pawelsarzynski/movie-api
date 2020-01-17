import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './comment.entity';
import { CommentController } from './comment.controller';
import { CommentMapperImpl } from './comment.mapper';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService, CommentMapperImpl],
})
export class CommentModule {}
