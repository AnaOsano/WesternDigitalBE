import { Module } from '@nestjs/common';
import { SearchController } from './controllers/search/search.controller';
import { SearchService } from './services/search/search.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
