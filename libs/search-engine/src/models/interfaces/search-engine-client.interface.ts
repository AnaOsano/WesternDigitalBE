// libs/search-adapter/src/search-client.interface.ts
export interface SearchEngineClient {
  search(query: string, options?: any): Promise<any>;
  index(document: any, options?: any): Promise<any>;
  update(id: string, document: any, options?: any): Promise<any>;
  delete(id: string, options?: any): Promise<any>;
}
