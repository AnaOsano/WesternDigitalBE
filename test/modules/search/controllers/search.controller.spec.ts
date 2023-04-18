import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from '../../../../src/modules/search/controllers/search/search.controller';
import { SearchService } from '../../../../src/modules/search/services/search/search.service';
import { IPaginatedType } from '../../../../src/models/dtos/pagination.out.dto';
import { SearchResultDto } from '../../../../src/modules/search/models/dtos/search-result.out.dto';
import {
  indexDataDtoArrayMock,
  indexResultsDtoMock,
} from '../mocks/search.mocks';

describe('SearchController', () => {
  let controller: SearchController;
  let service: SearchService;

  beforeEach(async () => {
    const mockSearchService = {
      search: jest.fn(),
      indexData: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: mockSearchService,
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return search results', async () => {
    const query = 'test query';
    const expectedResult: IPaginatedType<SearchResultDto> = {
      items: [
        {
          id: '1',
          title: 'Test title',
          content: 'Test description',
        },
      ],
      skip: 0,
      limit: 10,
      total: 1,
    };

    (service.search as jest.Mock).mockResolvedValue(expectedResult);

    const result = await controller.search(query, 0, 10);

    expect(result).toEqual(expectedResult);
    expect(service.search).toHaveBeenCalledWith(query, { skip: 0, limit: 10 });
  });

  it('should handle errors', async () => {
    const query = 'error query';
    const error = new Error('Search failed');

    (service.search as jest.Mock).mockRejectedValue(error);

    try {
      await controller.search(query, 0, 10);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe('Search failed');
      } else {
        fail('Error not instance of Error');
      }
    }
  });

  it('should index data and return indexed results', async () => {
    (service.indexData as jest.Mock).mockResolvedValue(indexResultsDtoMock);

    const result = await controller.indexData(indexDataDtoArrayMock);

    expect(result).toEqual(indexResultsDtoMock);
    expect(service.indexData).toHaveBeenCalledWith(indexDataDtoArrayMock);
  });

  it('should handle errors when indexing data', async () => {
    const error = new Error('Indexing failed');
    (service.indexData as jest.Mock).mockRejectedValue(error);

    try {
      await controller.indexData(indexDataDtoArrayMock);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe('Indexing failed');
      } else {
        fail('Error not instance of Error');
      }
    }
  });
});
