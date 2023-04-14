import { Client } from "@elastic/elasticsearch";
import { SearchEngineClient } from "../../models/interfaces/search-engine-client.interface";
import {
  AggregationsAggregate,
  SearchResponse,
} from "@elastic/elasticsearch/lib/api/types";

export class ElasticSearchService implements SearchEngineClient {
  private readonly client: Client;

  constructor(private readonly config: any) {
    this.client = new Client(config);
  }

  async search(
    query: string,
    { skip, limit }
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
              fields: ["title", "content"],
            },
          },
        },
      });

      return results;
    } catch (error) {
      throw error;
    }
  }

  index(document: any, options?: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(id: string, document: any, options?: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(id: string, options?: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
