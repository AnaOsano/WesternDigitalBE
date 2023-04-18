import { Inject, Injectable } from '@nestjs/common';
import { SEARCH_ENGINE_CONFIG } from './models/dtos/search-engine.constants';
import { SearchEngineConfig } from './models/interfaces/search-engine.config';
import { ElasticSearchService } from './services/elastic-search/elastic-search.service';
import { SearchEngineClient } from './models/interfaces/search-engine-client.interface';
import { PaginationArgs } from '../../../src/models/dtos/pagination.in.dto';
import {
  AggregationsAggregate,
  SearchResponse
} from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class SearchEngineService {
  private searchEngineClient: SearchEngineClient;

  constructor(
    @Inject(SEARCH_ENGINE_CONFIG) private config: SearchEngineConfig
  ) {
    switch (config.provider) {
      case 'elasticsearch':
        this.searchEngineClient = new ElasticSearchService(config.options);
        break;
      default:
        throw new Error(`Unsupported search engine client: ${config.provider}`);
    }
  }

  async search(
    query: string,
    pagination: PaginationArgs
  ): Promise<
    SearchResponse<unknown, Record<string, AggregationsAggregate>> | any
  > {
    return this.searchEngineClient.search(query, pagination);
  }

  get provider(): 'elasticsearch' | 'alternative' {
    return this.config.provider || 'elasticsearch';
  }
}
