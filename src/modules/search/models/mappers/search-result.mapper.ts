import {
  AggregationsAggregate,
  SearchResponse
} from '@elastic/elasticsearch/lib/api/types';
import { SearchResultDto } from '../dtos/search-result.out.dto';
import { PaginationArgs } from '../../../../models/dtos/pagination.in.dto';
import { IPaginatedType } from '../../../../models/dtos/pagination.out.dto';

export const PaginatedSearchResultsMapper = (
  result: SearchResponse<unknown, Record<string, AggregationsAggregate>> | any,
  pagination: PaginationArgs,
  provider: 'elasticsearch' | 'alternative',
): IPaginatedType<SearchResultDto> => {
  try {
    switch (provider) {
      case 'elasticsearch':
        const items: SearchResultDto[] = result?.hits?.hits?.map((hit) =>
          SearchResultMapper(hit._source),
        );

        const total = result?.hits?.total.value;
        const { skip, limit } = pagination;

        return {
          items,
          skip,
          limit,
          total
        };
      default:
        throw new Error(`Unsupported search engine client: ${provider}`);
    }
  } catch (e) {
    throw e;
  }
};

export const SearchResultMapper = (item: any): SearchResultDto => {
  try {
    return {
      id: item.id,
      title: item.title,
      content: item.content
    };
  } catch (e) {
    throw e;
  }
};
