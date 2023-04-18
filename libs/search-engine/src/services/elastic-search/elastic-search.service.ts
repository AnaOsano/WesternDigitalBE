import { Client, TransportResult } from '@elastic/elasticsearch';
import { SearchEngineClient } from '../../models/interfaces/search-engine-client.interface';
import {
  AggregationsAggregate,
  BulkResponse,
  SearchResponse,
} from '@elastic/elasticsearch/lib/api/types';
import { IndexDataDto } from '../../../../../src/modules/search/models/dtos/index-data.in.dto';

export class ElasticSearchService implements SearchEngineClient {
  private readonly client: Client;

  constructor(private readonly config: any) {
    this.client = new Client(config);
  }

  async search(
    query: string,
    { skip, limit },
  ): Promise<SearchResponse<unknown, Record<string, AggregationsAggregate>>> {
    try {
      const results = await this.client.search({
        index: process.env.ELASTICSEARCH_INDEX,
        from: skip,
        size: limit,
        body: {
          query: {
            multi_match: {
              query: query,
              fields: ['title', 'content'],
            },
          },
        },
      });

      return results;
    } catch (error) {
      throw error;
    }
  }

  async index(indexDataDto: IndexDataDto[], options?: any): Promise<BulkResponse> {
    try {
      const bulkIndexBody: any[] = [];

      indexDataDto.forEach((doc) => {
        bulkIndexBody.push({
          index: {
            _index: process.env.ELASTICSEARCH_INDEX
          },
        });
        bulkIndexBody.push(doc);
      });

      const response = await this.client.bulk({
        refresh: 'wait_for',
        body: bulkIndexBody,
        ...options,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
  update(id: string, document: any, options?: any): Promise<any> {
    throw new Error(`Method not implemented. ${id} ${document} ${options}`);
  }
  delete(id: string, options?: any): Promise<any> {
    throw new Error(`Method not implemented. ${id} ${options}`);
  }
}
