import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from '../../../../src/modules/search/services/search/search.service';
import { SearchEngineService } from '../../../../libs/search-engine/src/search-engine.service';
import { PaginationArgs } from '../../../../src/models/dtos/pagination.in.dto';
import { SearchResultDto } from '../../../../src/modules/search/models/dtos/search-result.out.dto';
import { IPaginatedType } from '../../../../src/models/dtos/pagination.out.dto';
import * as SearchResultMapper from '../../../../src/modules/search/models/mappers/search-result.mapper';

jest.mock('../../../../libs/search-engine/src/search-engine.service');
jest.mock('../../../../src/modules/search/models/mappers/search-result.mapper');

describe('SearchService', () => {
  let service: SearchService;
  let searchEngineService: SearchEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService, SearchEngineService],
    }).compile();

    service = module.get<SearchService>(SearchService);
    searchEngineService = module.get<SearchEngineService>(SearchEngineService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call searchEngineService.search with the correct parameters', async () => {
    const query = 'search query';
    const pagination: PaginationArgs = { skip: 0, limit: 10 };
    const searchEngineResult: IPaginatedType<SearchResultDto> = {
      items: [],
      total: 0,
      skip: pagination.skip,
      limit: pagination.limit,
    };
  
    jest.spyOn(searchEngineService, 'search').mockResolvedValue(searchEngineResult);
    const mapperSpy = jest.spyOn(SearchResultMapper, 'PaginatedSearchResultsMapper').mockReturnValue(searchEngineResult);
  
    await service.search(query, pagination);
  
    expect(searchEngineService.search).toHaveBeenCalledWith(query, pagination);
  });

  it('should call PaginatedSearchResultsMapper with the correct parameters', async () => {
    const query = 'search query';
    const pagination: PaginationArgs = { skip: 0, limit: 10 };
    const searchEngineResult: IPaginatedType<SearchResultDto> = {
      items: [],
      total: 0,
      skip: pagination.skip,
      limit: pagination.limit,
    };

    jest.spyOn(searchEngineService, 'search').mockResolvedValue(searchEngineResult);
    const mapperSpy = jest.spyOn(SearchResultMapper, 'PaginatedSearchResultsMapper').mockReturnValue(searchEngineResult);

    await service.search(query, pagination);

    expect(mapperSpy).toHaveBeenCalledWith(searchEngineResult, pagination, searchEngineService.provider);
  });

  it('should handle errors', async () => {
    const query = 'error query';
    const error = new Error('Search failed');
    const pagination: PaginationArgs = { skip: 0, limit: 10 };

    jest.spyOn(searchEngineService, 'search').mockRejectedValue(error);

    try {
      await service.search(query, pagination);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe('Search failed');
      } else {
        fail('Error not instance of Error');
      }
    }
  });
});
