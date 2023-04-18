import {
  AggregationsAggregate,
  BulkResponse,
  SearchResponse,
} from '@elastic/elasticsearch/lib/api/types';

export const query = 'test query';

export const skip = 0;

export const limit = 10;

export const expectedSearchParameters = {
  index: process.env.ELASTICSEARCH_INDEX,
  from: skip,
  size: limit,
  body: {
    query: {
      multi_match: {
        query,
        fields: ['title', 'content'],
      },
    },
  },
};

export const searchResponse = {
  body: {
    hits: {
      total: { value: 1, relation: 'eq' },
      hits: [{ _source: { title: 'Test title', content: 'Test content' } }],
    },
  },
};

export const searchMock = jest.fn().mockResolvedValue(searchResponse);

export const searchError = new Error('Search error');

export const searchErrorMock = jest.fn().mockRejectedValue(searchError);

export const expectedResult:
  | SearchResponse<unknown, Record<string, AggregationsAggregate>>
  | any = {
    body: {
      hits: {
        total: {
          value: 1,
          relation: 'eq',
        },
        hits: [{ _source: { title: 'Test title', content: 'Test content' } }],
      },
    },
    statusCode: 200,
    headers: {},
    meta: {
      context: null,
      name: 'elasticsearch-js',
      request: { params: {}, options: {}, id: null },
      connection: { url: 'http://localhost:9200', id: 'http' },
      attempts: 0,
      aborted: false,
    },
  };

export const indexDataDtoArrayMock = [
  {
    id: '1',
    title: 'Title 1',
    content: 'Content 1',
  },
  {
    id: '2',
    title: 'Title 2',
    content: 'Content 2',
  },
];

export const indexBulkResponse: BulkResponse = {
  items: [
    {
      index: {
        _index: 'test',
        _id: '1',
        _version: 1,
        result: 'created',
        _shards: {
          total: 2,
          successful: 1,
          failed: 0,
        },
        _seq_no: 0,
        _primary_term: 1,
        status: 201,
      },
    },
    {
      index: {
        _index: 'test',
        _id: '2',
        _version: 1,
        result: 'created',
        _shards: {
          total: 2,
          successful: 1,
          failed: 0,
        },
        _seq_no: 0,
        _primary_term: 1,
        status: 201,
      },
    },
  ],
  errors: false,
  took: 0
};
