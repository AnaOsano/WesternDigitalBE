import { Test, TestingModule } from "@nestjs/testing";
import { ElasticSearchService } from "../../../../../libs/search-engine/src/services/elastic-search/elastic-search.service";
import { Client } from "@elastic/elasticsearch";

jest.mock("@elastic/elasticsearch");

describe("ElasticSearchService", () => {
  let service: ElasticSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ElasticSearchService,
          useFactory: () => {
            const mockedClient = new Client({ node: "http://localhost:9200" });
            return new ElasticSearchService({ node: "http://localhost:9200", client: mockedClient });
          },
        },
      ],
    }).compile();

    (Client as any).mockClear();
    service = module.get<ElasticSearchService>(ElasticSearchService);
  });

  it("should search using the Elasticsearch client", async () => {
    const query = "test query";
    const skip = 0;
    const limit = 10;

    const searchMock = jest.fn().mockResolvedValue({
      body: {
        hits: {
          total: { value: 1, relation: "eq" },
          hits: [{ _source: { title: "Test title", content: "Test content" } }],
        },
      },
    });

    (service as any).client.search = searchMock;

    const result = await service.search(query, { skip, limit });

    expect(searchMock).toHaveBeenCalledWith({
      index: "search",
      from: skip,
      size: limit,
      body: {
        query: {
          multi_match: {
            query,
            fields: ["title", "content"],
          },
        },
      },
    });
    expect(result).toEqual({
      body: {
        hits: {
          total: { value: 1, relation: "eq" },
          hits: [{ _source: { title: "Test title", content: "Test content" } }],
        },
      },
    });
  });

  it("should throw an error when searching in Elasticsearch fails", async () => {
    const searchMock = jest.fn().mockRejectedValue(new Error("Search error"));
    (service as any).client.search = searchMock;

    await expect(
      service.search("test query", { skip: 0, limit: 10 })
    ).rejects.toThrow("Search error");
  });
});
