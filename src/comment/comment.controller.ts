import { Controller, Post, Body } from '@nestjs/common';

import { CommentDto } from './comment.dto';
import { CommentService } from './comment.service';
import { CommentMapperImpl } from './comment.mapper';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentMapper: CommentMapperImpl,
  ) {}

  @Post()
  async create(@Body() comment: CommentDto) {
    const commentEntity = this.commentMapper.fromDtoToDomain(comment);
    const newComment = await this.commentService.create(comment);

    return newComment;
  }
}
