import { Inject, Injectable } from '@nestjs/common';
import { SEARCH_ENGINE_CONFIG } from './models/dtos/search-engine.constants';
import { SearchEngineConfig } from './models/interfaces/search-engine.config';
import { ElasticSearchService } from './services/elastic-search/elastic-search.service';
import { SearchEngineClient } from './models/interfaces/search-engine-client.interface';

@Injectable()
export class SearchEngineService {
  private searchEngineClient: SearchEngineClient;

  constructor(
    @Inject(SEARCH_ENGINE_CONFIG) private config: SearchEngineConfig,
  ) {
    switch (config.provider) {
      case 'elasticsearch':
        this.searchEngineClient = new ElasticSearchService(config.options);
        break;
      // Add more cases for different search engine clients as needed
      default:
        throw new Error(`Unsupported search engine client: ${config.provider}`);
    }
  }

  // Delegate methods to the searchEngineClient instance
  async search(query: string): Promise<any> {
    return this.searchEngineClient.search(query);
  }
}
