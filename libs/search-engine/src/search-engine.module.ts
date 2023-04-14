import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SearchEngineService } from './search-engine.service';
import { SEARCH_ENGINE_CONFIG } from './models/dtos/search-engine.constants';
import { SearchEngineConfig } from './models/interfaces/search-engine.config';

@Module({})
export class SearchEngineModule {
  static forRoot(config: SearchEngineConfig): DynamicModule {
    const searchEngineConfigProvider: Provider = {
      provide: SEARCH_ENGINE_CONFIG,
      useValue: config,
    };

    return {
      global: true,
      module: SearchEngineModule,
      providers: [searchEngineConfigProvider, SearchEngineService],
      exports: [SearchEngineService],
    };
  }
}
