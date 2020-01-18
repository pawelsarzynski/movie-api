import { Repository } from 'typeorm';

import { CommentService } from './comment.service';
import { Comment } from './comment.entity';

const commentDomainFixture = {
  id: 1,
  text: 'foo',
  movie: {
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
  },
};

describe('CommentService', () => {
  let commentService: CommentService;
  let commentRepository: Repository<Comment>;

  beforeEach(() => {
    commentRepository = new Repository();
    commentService = new CommentService(commentRepository);
  });

  describe('create', () => {
    it('should create and return a new comment', async () => {
      jest
        .spyOn(commentRepository, 'save')
        .mockImplementation(() => Promise.resolve(commentDomainFixture));

      const result = await commentService.create(commentDomainFixture);

      expect(commentRepository.save).toHaveBeenCalledWith(commentDomainFixture);
      expect(result).toEqual(commentDomainFixture);
    });

    it('should throw an error when the repository rejects', async () => {
      jest.spyOn(commentRepository, 'save').mockRejectedValueOnce({ message: 'error' });

      try {
        expect(await commentService.create(commentDomainFixture)).toThrow();
      } catch (error) {
        expect(commentRepository.save).toHaveBeenCalledWith(commentDomainFixture);
        expect(error.message).toBe('error');
      }
    });

    describe('getComment', () => {
      it('should find by id and return a comment', async () => {
        jest.spyOn(commentRepository, 'findOne').mockResolvedValueOnce(commentDomainFixture);

        const result = await commentService.getComment('1');

        expect(commentRepository.findOne).toHaveBeenCalledWith('1');
        expect(result).toEqual(commentDomainFixture);
      });
    });

    it('should throw an error when there is no comment', async () => {
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(undefined);

      try {
        expect(await commentService.getComment('1')).toThrow();
      } catch (error) {
        expect(commentRepository.findOne).toHaveBeenCalledWith('1');
        expect(error.status).toBe(400);
        expect(error.message).toBe('Comment not found');
      }
    });
  });
});
