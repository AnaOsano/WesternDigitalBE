import { Module } from '@nestjs/common';
import { SearchController } from './controllers/search/search.controller';
import { SearchService } from './services/search/search.service';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [CaslModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
