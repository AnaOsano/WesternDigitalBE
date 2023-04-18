import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './modules/search/search.module';
import { SearchEngineModule } from '../libs/search-engine/src';
import { HealthCheckModule } from './modules/health-check/health-check.module';

@Module({
  imports: [
    SearchEngineModule.forRoot({
      provider: 'elasticsearch',
      options: {
        node: process.env.ELASTICSEARCH_NODE || 'http://elasticsearch:9200',
        index: process.env.ELASTICSEARCH_INDEX || 'hr',
        maxRetries: 10,
        requestTimeout: 60000
      }
    }),
    SearchModule,
    HealthCheckModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
