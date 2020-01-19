import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CommentDto } from './comment.dto';
import { CommentService } from './comment.service';
import { CommentMapperImpl } from './comment.mapper';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentMapper: CommentMapperImpl,
  ) {}

  @Post()
  async create(@Body() comment: CommentDto): Promise<CommentDto> {
    const commentEntity = this.commentMapper.fromDtoToDomain(comment);
    const newComment = await this.commentService.create(commentEntity);
    const commentDto = this.commentMapper.fromDomainToDto(newComment);

    return commentDto;
  }

  @Get(':id')
  async getComment(@Param('id') id: string): Promise<CommentDto> {
    const comment = await this.commentService.getComment(id);
    const commentDto = this.commentMapper.fromDomainToDto(comment);

    return commentDto;
  }
}
