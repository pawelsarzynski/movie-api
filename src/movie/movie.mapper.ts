import { Injectable } from '@nestjs/common';
import * as R from 'ramda';

import { Movie } from './movie.entity';
import { MovieDto } from './movie.dto';

import { Mapper } from '../helpers/mapper';
import { CommentMapperImpl } from '../comment/comment.mapper';

export type MovieMapper = Mapper<MovieDto, Movie>;

@Injectable()
export class MovieMapperImpl implements MovieMapper {
  constructor(private readonly commentMapper: CommentMapperImpl) {}

  public fromDomainToDto(domain: Movie): MovieDto {
    if (!domain) return null;

    const dto = new MovieDto();

    Object.assign(
      dto,
      R.pick(
        [
          'id',
          'title',
          'released',
          'runtime',
          'genre',
          'director',
          'writer',
          'actors',
          'plot',
          'language',
          'country',
          'awards',
          'poster',
        ],
        domain,
      ),
    );

    if (domain.comments) {
      dto.comments = domain.comments.map(comment => this.commentMapper.fromDomainToDto(comment));
    }

    return dto;
  }

  public fromDtoToDomain(dto: MovieDto): Movie {
    if (!dto) return null;

    const domain = new Movie();

    Object.assign(
      domain,
      R.pick(
        [
          'id',
          'title',
          'released',
          'runtime',
          'genre',
          'director',
          'writer',
          'actors',
          'plot',
          'language',
          'country',
          'awards',
          'poster',
        ],
        dto,
      ),
    );

    domain.comments = dto.comments.map(comment => this.commentMapper.fromDtoToDomain(comment));

    return domain;
  }
}
