import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './modules/search/search.module';
import { SearchEngineModule } from '../libs/search-engine/src';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { AuthModule } from './modules/auth/auth.module';
import { CaslModule } from './modules/casl/casl.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    SearchEngineModule.forRoot({
      provider: 'elasticsearch',
      options: {
        node: process.env.ELASTICSEARCH_NODE || 'http://elasticsearch:9200',
        index: process.env.ELASTICSEARCH_INDEX || 'hr',
        maxRetries: 10,
        requestTimeout: 60000,
      },
    }),
    SearchModule,
    HealthCheckModule,
    AuthModule.forRoot(),
    CaslModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
