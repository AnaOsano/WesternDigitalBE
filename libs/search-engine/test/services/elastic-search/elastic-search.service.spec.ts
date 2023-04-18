import { Test, TestingModule } from '@nestjs/testing';
import { ElasticSearchService } from '../../../src/services/elastic-search/elastic-search.service';
import { Client } from '@elastic/elasticsearch';
import {
  expectedSearchParameters,
  indexBulkResponse,
  indexDataDtoArrayMock,
  limit,
  query,
  searchErrorMock,
  searchResponse,
  skip,
} from '../../mocks/search-engine.mocks';

jest.mock('@elastic/elasticsearch');

describe('ElasticSearchService', () => {
  let service: ElasticSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ElasticSearchService,
          useFactory: () => {
            const mockedClient = new Client({ node: 'http://localhost:9200' });
            return new ElasticSearchService({
              node: 'http://localhost:9200',
              client: mockedClient,
            });
          },
        },
      ],
    }).compile();

    (Client as any).mockClear();
    service = module.get<ElasticSearchService>(ElasticSearchService);
  });

  it('should search using the Elasticsearch client', async () => {
    const searchMock = jest.fn().mockResolvedValue(searchResponse);

    (service as any).client.search = searchMock;

    const result = await service.search(query, { skip, limit });

    expect(searchMock).toHaveBeenCalledWith(expectedSearchParameters);
    expect(result).toEqual(searchResponse);
  });

  it('should throw an error when searching in Elasticsearch fails', async () => {
    const searchMock = searchErrorMock;
    (service as any).client.search = searchMock;

    await expect(service.search(query, { skip, limit })).rejects.toThrow(
      'Search error',
    );
  });

  // Add these test cases in your ElasticSearchService test suite
  it('should index data using the Elasticsearch client', async () => {
    const bulkMock = jest.fn().mockResolvedValue(indexBulkResponse);

    (service as any).client.bulk = bulkMock;

    const result = await service.index(indexDataDtoArrayMock);

    expect(bulkMock).toHaveBeenCalled();
    expect(result).toEqual(indexBulkResponse);
  });

  it('should throw an error when indexing data in Elasticsearch fails', async () => {
    const bulkErrorMock = jest
      .fn()
      .mockRejectedValue(new Error('Indexing error'));

    (service as any).client.bulk = bulkErrorMock;

    await expect(service.index(indexDataDtoArrayMock)).rejects.toThrow(
      'Indexing error',
    );
  });
});
