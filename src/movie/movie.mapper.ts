import { Injectable } from '@nestjs/common';

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

    dto.id = domain.id;
    dto.released = domain.released;
    dto.runtime = domain.runtime;
    dto.genre = domain.genre;
    dto.director = domain.director;
    dto.writer = domain.writer;
    dto.actors = domain.actors;
    dto.plot = domain.plot;
    dto.language = domain.language;
    dto.country = domain.country;
    dto.awards = domain.awards;
    dto.poster = domain.poster;

    if (domain.comments) {
      dto.comments = domain.comments.map(comment => this.commentMapper.fromDomainToDto(comment));
    }

    return dto;
  }

  public fromDtoToDomain(dto: MovieDto): Movie {
    if (!dto) return null;

    const domain = new Movie();

    domain.id = dto.id;
    domain.released = dto.released;
    domain.runtime = dto.runtime;
    domain.genre = dto.genre;
    domain.director = dto.director;
    domain.writer = dto.writer;
    domain.actors = dto.actors;
    domain.plot = dto.plot;
    domain.language = dto.language;
    domain.country = dto.country;
    domain.awards = dto.awards;
    domain.poster = dto.poster;
    domain.comments = dto.comments.map(comment => this.commentMapper.fromDtoToDomain(comment));

    return domain;
  }
}
