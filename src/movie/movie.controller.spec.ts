import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MovieController } from './movie.controller';
import { MovieMapperImpl } from './movie.mapper';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { CommentMapperImpl } from '../comment/comment.mapper';

const movieFixture = {
  id: 1,
  title: 'Foo',
  released: '19 Sep 2003',
  runtime: '100 min',
  genre: 'Crime, Thriller',
  director: 'Kaizad Gustad',
  writer: 'Kaizad Gustad',
  actors: 'Amitabh Bachchan',
  plot: 'Three female models are unwittingly',
  language: 'English, Hindi, Marathi',
  country: 'India',
  awards: 'N/A',
  poster: 'foo',
  comments: [],
};

describe('MovieController', () => {
  let movieController: MovieController;
  let movieMapper: MovieMapperImpl;
  let movieService: MovieService;
  let repository: Repository<Movie>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        MovieService,
        MovieMapperImpl,
        CommentMapperImpl,
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository,
        },
      ],
    }).compile();

    movieController = module.get<MovieController>(MovieController);
    movieMapper = module.get<MovieMapperImpl>(MovieMapperImpl);
    movieService = module.get<MovieService>(MovieService);
    repository = module.get(getRepositoryToken(Movie));
  });

  describe('create', () => {
    it('should create and return a new movieDto', async () => {
      const body = { title: 'foo' };

      jest.spyOn(movieService, 'create').mockImplementation(() => Promise.resolve(movieFixture));
      jest.spyOn(movieMapper, 'fromDomainToDto').mockImplementation(() => movieFixture);

      const response = await movieController.create(body.title);

      expect(movieService.create).toHaveBeenCalledWith('foo');
      expect(movieMapper.fromDomainToDto).toHaveBeenCalledWith(movieFixture);

      expect(response).toEqual(movieFixture);
    });
  });

  describe('getMovie', () => {
    it('should find the movie by the id and return movie dto', async () => {
      jest.spyOn(movieService, 'getMovie').mockImplementation(() => Promise.resolve(movieFixture));
      jest.spyOn(movieMapper, 'fromDomainToDto').mockImplementation(() => movieFixture);

      const response = await movieController.getMovie('1');

      expect(movieService.getMovie).toHaveBeenCalledWith('1');
      expect(movieMapper.fromDomainToDto).toHaveBeenCalledWith(movieFixture);

      expect(response).toEqual(movieFixture);
    });
  });

  describe('getMovies', () => {
    it('should find the movies and return an array of the dtos', async () => {
      jest
        .spyOn(movieService, 'getAll')
        .mockImplementation(() => Promise.resolve([movieFixture, movieFixture]));
      jest.spyOn(movieMapper, 'fromDomainToDto').mockImplementation(() => movieFixture);

      const response = await movieController.getMovies();

      expect(movieService.getAll).toHaveBeenCalled();
      expect(movieMapper.fromDomainToDto).toHaveBeenCalledTimes(2);
      expect(movieMapper.fromDomainToDto).toHaveBeenCalledWith(movieFixture);

      expect(response).toEqual([movieFixture, movieFixture]);
    });
  });
});
