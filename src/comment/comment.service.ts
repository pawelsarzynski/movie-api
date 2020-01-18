import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(comment: Comment): Promise<Comment> {
    try {
      return this.commentRepository.save(comment);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async getComment(id: string): Promise<Comment> {
    try {
      const comment = await this.commentRepository.findOne(id);

      if (!comment) throw new Error();

      return comment;
    } catch {
      throw new HttpException('Comment not found', 400);
    }
  }
}
