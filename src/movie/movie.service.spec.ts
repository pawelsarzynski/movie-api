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

  describe('getMovie', () => {
    it('should find and return the movie', async () => {
      jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(movieDomainFixture);

      const result = await movieService.getMovie('1');

      expect(movieRepository.findOne).toHaveBeenCalledWith('1', { relations: ['comments'] });
      expect(result).toEqual(movieDomainFixture);
    });

    it('should throw an error when the repository rejects', async () => {
      jest.spyOn(movieRepository, 'findOne').mockRejectedValueOnce({ message: 'error' });

      try {
        expect(await movieService.getMovie('1')).toThrow();
      } catch (error) {
        expect(movieRepository.findOne).toHaveBeenCalledWith('1', { relations: ['comments'] });
        expect(error.message).toBe('error');
        expect(error.status).toBe(500);
      }
    });
  });

  describe('getAll', () => {
    it('should get and return an array of movies', async () => {
      jest
        .spyOn(movieRepository, 'find')
        .mockResolvedValueOnce([movieDomainFixture, movieDomainFixture]);

      const result = await movieService.getAll();

      expect(movieRepository.find).toHaveBeenCalled();
      expect(result).toEqual([movieDomainFixture, movieDomainFixture]);
    });

    it('should throw an error when the repository rejects', async () => {
      jest.spyOn(movieRepository, 'find').mockRejectedValueOnce({ message: 'error' });

      try {
        expect(await movieService.getAll()).toThrow();
      } catch (error) {
        expect(movieRepository.find).toHaveBeenCalled();
        expect(error.message).toBe('error');
        expect(error.status).toBe(500);
      }
    });
  });
});
