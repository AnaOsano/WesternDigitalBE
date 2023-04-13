import { Client } from "@elastic/elasticsearch";
import { SearchEngineClient } from "../../models/interfaces/search-engine-client.interface";

export class ElasticSearchService implements SearchEngineClient {
  private readonly client: Client;

  constructor(private readonly config: any) {
    this.client = new Client({
      node: "http://es-container:9200", // Using the Elasticsearch URL from the docker-compose
      ...config, // Any additional configuration options provided
    });
  }

  async search(query: string): Promise<any> {
    try {
      const response = await this.client.search({
        index: "your-index-name", // Replace with your desired index name
        body: {
          query: {
            match: {
              // Replace 'field' with the field you want to search in
              field: query,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error searching in Elasticsearch:", error);
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
