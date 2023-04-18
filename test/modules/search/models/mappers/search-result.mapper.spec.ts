import { PaginationArgs } from '../../../../../src/models/dtos/pagination.in.dto';
import { IPaginatedType } from '../../../../../src/models/dtos/pagination.out.dto';
import { SearchResultDto } from '../../../../../src/modules/search/models/dtos/search-result.out.dto';
import { PaginatedSearchResultsMapper, SearchResultMapper } from '../../../../../src/modules/search/models/mappers/search-result.mapper';

 
describe('PaginatedSearchResultsMapper', () => {
  it('should map elasticsearch results correctly', () => {
    const pagination: PaginationArgs = { skip: 0, limit: 10 };
    const searchResponse = {
      hits: {
        total: { value: 1 },
        hits: [
          {
            _source: {
              id: '1',
              title: 'Title 1',
              content: 'Content 1'
            }
          }
        ]
      }
    };
  
    const expectedResult: IPaginatedType<SearchResultDto> = {
      items: [
        {
          id: '1',
          title: 'Title 1',
          content: 'Content 1'
        }
      ],
      skip: 0,
      limit: 10,
      total: 1
    };
  
    const result = PaginatedSearchResultsMapper(searchResponse, pagination, 'elasticsearch');
    expect(result).toEqual(expectedResult);
  });
  
  it('should throw an error when using an unsupported search engine client', () => {
    const pagination: PaginationArgs = { skip: 0, limit: 10 };
    const searchResponse = {};
  
    expect(() => {
      PaginatedSearchResultsMapper(searchResponse, pagination, 'alternative');
    }).toThrowError('Unsupported search engine client: alternative');
  });
});
  
describe('SearchResultMapper', () => {
  it('should map an individual search result item correctly', () => {
    const item = {
      id: '1',
      title: 'Title 1',
      content: 'Content 1'
    };
  
    const expectedResult: SearchResultDto = {
      id: '1',
      title: 'Title 1',
      content: 'Content 1'
    };
  
    const result = SearchResultMapper(item);
    expect(result).toEqual(expectedResult);
  });
});
  