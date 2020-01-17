import { Injectable } from '@nestjs/common';

import { Comment } from './comment.entity';
import { CommentDto } from './comment.dto';
import { Movie } from '../movie/movie.entity';

import { Mapper } from '../helpers/mapper';

export type CommentMapper = Mapper<CommentDto, Comment>;

@Injectable()
export class CommentMapperImpl implements CommentMapper {
  public fromDomainToDto(domain: Comment): CommentDto {
    if (!domain) return null;

    const dto = new CommentDto();

    dto.id = domain.id;
    dto.text = domain.text;

    if (domain.movie) {
      dto.movie = domain.movie.id;
    }

    return dto;
  }

  public fromDtoToDomain(dto: CommentDto): Comment {
    if (!dto) return null;

    const domain = new Comment();
    const movie = new Movie();

    movie.id = dto.movie;

    domain.id = dto.id;
    domain.text = dto.text;
    domain.movie = movie;

    return domain;
  }
}
