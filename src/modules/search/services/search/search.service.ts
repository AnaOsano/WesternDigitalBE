import { Injectable } from '@nestjs/common';
import { SearchEngineService } from '../../../../../libs/search-engine/src/search-engine.service';
import { PaginationArgs } from '../../../../models/dtos/pagination.in.dto';
import { IPaginatedType } from '../../../../models/dtos/pagination.out.dto';
import { SearchResultDto } from '../../models/dtos/search-result.out.dto';
import {
  PaginatedSearchResultsMapper,
  IndexResultsMapper,
} from '../../models/mappers/search-result.mapper';
import { IndexDataDto } from '../../models/dtos/index-data.in.dto';
import { IndexResultsDto } from '../../models/dtos/index-data.out.dto';

@Injectable()
export class SearchService {
  constructor(private readonly searchEngineService: SearchEngineService) {
    this.searchEngineService = searchEngineService;
  }
  async search(
    query: string,
    pagination: PaginationArgs,
  ): Promise<IPaginatedType<SearchResultDto>> {
    try {
      const result = await this.searchEngineService.search(query, pagination);

      return PaginatedSearchResultsMapper(
        result,
        pagination,
        this.searchEngineService.provider,
      );
    } catch (err) {
      throw err;
    }
  }
  async indexData(indexDataDto: IndexDataDto[]): Promise<IndexResultsDto> {
    try {
      const results = await this.searchEngineService.index(indexDataDto);
      return IndexResultsMapper(results, this.searchEngineService.provider);
    } catch (err) {
      throw err;
    }
  }
}
