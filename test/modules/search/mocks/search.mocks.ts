import { IndexDataDto } from '../../../../src/modules/search/models/dtos/index-data.in.dto';
import { IndexResultsDto } from '../../../../src/modules/search/models/dtos/index-data.out.dto';

export const indexDataDtoArrayMock: IndexDataDto[] = [
  {
    id: '1',
    title: 'Test Title 1',
    content: 'Test Content 1',
  },
  {
    id: '2',
    title: 'Test Title 2',
    content: 'Test Content 2',
  },
];

export const indexResultsDtoMock: IndexResultsDto = {
  indexedCount: 2,
  indexedIds: ['OEbvlYcBEgFxFtc2myL4', 'OUbvlYcBEgFxFtc2myL4'],
};
