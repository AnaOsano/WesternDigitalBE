import {
  AggregationsAggregate,
  SearchResponse,
} from "@elastic/elasticsearch/lib/api/types";

// libs/search-adapter/src/search-client.interface.ts
export interface SearchEngineClient {
  search(
    query: string,
    options?: any
  ): Promise<
    SearchResponse<unknown, Record<string, AggregationsAggregate>> | any
  >;
  index(document: any, options?: any): Promise<any>;
  update(id: string, document: any, options?: any): Promise<any>;
  delete(id: string, options?: any): Promise<any>;
}
