import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Post,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SearchService } from '../../services/search/search.service';
import { ApiPath } from '../../../../helpers/api-version.helper';
import { IPaginatedType } from '../../../../models/dtos/pagination.out.dto';
import { SearchResultDto } from '../../models/dtos/search-result.out.dto';
import { PaginationArgs } from '../../../../models/dtos/pagination.in.dto';
import { IndexDataDto } from '../../models/dtos/index-data.in.dto';
import { IndexResultsDto } from '../../models/dtos/index-data.out.dto';

@Controller(ApiPath('search'))
export class SearchController {
  constructor(private readonly searchService: SearchService) {
    this.searchService = searchService;
  }

  @Get()
  async search(
    @Query('query') query: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<IPaginatedType<SearchResultDto>> {
    try {
      const paginationArgs: PaginationArgs = { skip, limit };
      return await this.searchService.search(query, paginationArgs);
    } catch (e) {
      throw e;
    }
  }

  @Post('/index')
  async indexData(
    @Body() indexDataDto: IndexDataDto[],
  ): Promise<IndexResultsDto> {
    try {
      return await this.searchService.indexData(indexDataDto);
    } catch (e) {
      throw e;
    }
  }
}
