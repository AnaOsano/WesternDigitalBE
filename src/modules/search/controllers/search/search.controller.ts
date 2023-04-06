import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from '../../services/search/search.service';
import { ApiPath } from '../../../../helpers/api-version.helper';

@Controller(ApiPath('search'))
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query('query') query: string) {
    return await this.searchService.search(query);
  }
}
