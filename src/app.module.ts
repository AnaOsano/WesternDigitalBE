import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [SearchModule],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
