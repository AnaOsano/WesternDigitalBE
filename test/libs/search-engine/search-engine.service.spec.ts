import { Test, TestingModule } from "@nestjs/testing";
import { PaginationArgs } from "../../../src/models/dtos/pagination.in.dto";
import { SearchEngineService } from "../../../libs/search-engine/src";
import { ElasticSearchService } from "../../../libs/search-engine/src/services/elastic-search/elastic-search.service";
import { SEARCH_ENGINE_CONFIG } from "../../../libs/search-engine/src/models/dtos/search-engine.constants";
import { expectedResult, limit, query, skip } from "./mocks/search-engine.mocks";

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
    const pagination: PaginationArgs = { skip, limit };

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
