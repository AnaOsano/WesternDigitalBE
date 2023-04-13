import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SearchModule } from "./modules/search/search.module";
import { SearchEngineModule } from "../libs/search-engine/src";

@Module({
  imports: [
    SearchEngineModule.forRoot({
      provider: "elasticsearch",
      options: {
        node: process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
        index: process.env.ELASTICSEARCH_INDEX,
        maxRetries: 10,
        requestTimeout: 60000,
        auth: {
          username: process.env.ELASTIC_USER,
          password: process.env.ELASTIC_PASSWORD,
        },
      },
    }),
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
