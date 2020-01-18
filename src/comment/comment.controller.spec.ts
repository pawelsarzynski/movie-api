import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CommentController } from './comment.controller';
import { CommentMapperImpl } from './comment.mapper';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';

const commentDomainFixture = {
  id: 1,
  text: 'Foo bar',
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

const commentDtoFixture = {
  id: 1,
  text: 'Foo bar',
  movie: 1,
};

describe('CommentController', () => {
  let commentController: CommentController;
  let commentMapper: CommentMapperImpl;
  let commentService: CommentService;
  let repository: Repository<Comment>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        CommentService,
        CommentMapperImpl,
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
      ],
    }).compile();

    commentController = module.get<CommentController>(CommentController);
    commentMapper = module.get<CommentMapperImpl>(CommentMapperImpl);
    commentService = module.get<CommentService>(CommentService);
    repository = module.get(getRepositoryToken(Comment));
  });

  describe('create', () => {
    it('should create and return a new commentDto', async () => {
      jest.spyOn(commentMapper, 'fromDtoToDomain').mockImplementation(() => commentDomainFixture);
      jest
        .spyOn(commentService, 'create')
        .mockImplementation(() => Promise.resolve(commentDomainFixture));
      jest.spyOn(commentMapper, 'fromDomainToDto').mockImplementation(() => commentDtoFixture);

      const response = await commentController.create(commentDtoFixture);

      expect(commentMapper.fromDtoToDomain).toHaveBeenCalledWith(commentDtoFixture);
      expect(commentService.create).toHaveBeenCalledWith(commentDomainFixture);
      expect(commentMapper.fromDomainToDto).toHaveBeenCalledWith(commentDomainFixture);

      expect(response).toEqual(commentDtoFixture);
    });
  });

  describe('getComment', () => {
    it('should find the comment by the id and return comment dto', async () => {
      jest
        .spyOn(commentService, 'getComment')
        .mockImplementation(() => Promise.resolve(commentDomainFixture));
      jest.spyOn(commentMapper, 'fromDomainToDto').mockImplementation(() => commentDtoFixture);

      const response = await commentController.getComment('1');

      expect(commentService.getComment).toHaveBeenCalledWith('1');
      expect(commentMapper.fromDomainToDto).toHaveBeenCalledWith(commentDomainFixture);

      expect(response).toEqual(commentDtoFixture);
    });
  });
});
