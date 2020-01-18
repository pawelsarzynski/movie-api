import axios from 'axios';
import { Repository } from 'typeorm';

import { MovieService } from './movie.service';
import { Movie } from './movie.entity';

const movieDomainFixture = {
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

describe('MovieService', () => {
  let movieService: MovieService;
  let movieRepository: Repository<Movie>;

  beforeEach(() => {
    movieRepository = new Repository();
    movieService = new MovieService(movieRepository);
  });

  describe('create', () => {
    it('should get details from the api and create and return a new movie', async () => {
      jest.spyOn(movieRepository, 'findOne').mockResolvedValue(undefined);

      jest.spyOn(movieRepository, 'save').mockResolvedValue(movieDomainFixture);

      jest
        .spyOn(axios, 'get')
        .mockResolvedValueOnce({ data: { ...movieDomainFixture, Title: 'foo' } });

      const result = await movieService.create('foo');

      expect(movieRepository.findOne).toHaveBeenCalledTimes(2);
      expect(result).toEqual(movieDomainFixture);
    });

    it('should throw an error when the movie do not exist in the external api', async () => {
      jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(undefined);

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { Error: 'Not found' } });

      try {
        expect(await movieService.create('foo')).toThrow();
      } catch (error) {
        expect(movieRepository.findOne).toHaveBeenCalledWith({ title: 'Foo' });
        expect(error.message).toBe('Movie not found');
      }
    });

    it('should resolve with movie existing in database', async () => {
      jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(movieDomainFixture);

      const result = await movieService.create('foo');

      expect(movieRepository.findOne).toHaveBeenCalledWith({ title: 'Foo' });
      expect(result).toEqual(movieDomainFixture);
    });
  });
});
