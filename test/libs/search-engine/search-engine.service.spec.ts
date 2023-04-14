import { Test, TestingModule } from "@nestjs/testing";
import { PaginationArgs } from "../../../src/models/dtos/pagination.in.dto";
import {
  AggregationsAggregate,
  SearchResponse,
} from "@elastic/elasticsearch/lib/api/types";
import { SearchEngineService } from "../../../libs/search-engine/src";
import { ElasticSearchService } from "../../../libs/search-engine/src/services/elastic-search/elastic-search.service";
import { SEARCH_ENGINE_CONFIG } from "../../../libs/search-engine/src/models/dtos/search-engine.constants";

jest.mock("../../../libs/search-engine/src/services/elastic-search/elastic-search.service");

describe("SearchEngineService", () => {
  let service: SearchEngineService;
  let mockElasticSearchService: jest.Mocked<ElasticSearchService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchEngineService,
        {
          provide: SEARCH_ENGINE_CONFIG,
          useValue: { provider: "elasticsearch", options: {} },
        },
      ],
    }).compile();

    service = module.get<SearchEngineService>(SearchEngineService);
    mockElasticSearchService = new ElasticSearchService({}) as any;
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create an ElasticSearchService instance", () => {
    expect(service["searchEngineClient"]).toBeInstanceOf(ElasticSearchService);
  });

  it("should throw an error for unsupported search engine client", () => {
    const config = {
      provider: "unsupported",
      options: {},
    };
    const createService = () => new SearchEngineService(config as any);
    expect(createService).toThrowError(
      "Unsupported search engine client: unsupported"
    );
  });

  it("should search using the ElasticSearchService", async () => {
    const query = "test query";
    const pagination: PaginationArgs = { skip: 0, limit: 10 };
    const expectedResult:
      | SearchResponse<unknown, Record<string, AggregationsAggregate>>
      | any = {
      body: {
        hits: {
          total: {
            value: 1,
            relation: "eq",
          },
          hits: [{ _source: { title: "Test title", content: "Test content" } }],
        },
      },
      statusCode: 200,
      headers: {},
      meta: {
        context: null,
        name: "elasticsearch-js",
        request: { params: {}, options: {}, id: null },
        connection: { url: "http://localhost:9200", id: "http" },
        attempts: 0,
        aborted: false,
      },
    };

    mockElasticSearchService.search.mockResolvedValue(expectedResult);
    service["searchEngineClient"] = mockElasticSearchService;

    const result = await service.search(query, pagination);

    expect(mockElasticSearchService.search).toHaveBeenCalledWith(
      query,
      pagination
    );
    expect(result).toEqual(expectedResult);
  });

  it("should return the provider", () => {
    expect(service.provider).toEqual("elasticsearch");
  });
});
