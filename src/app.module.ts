import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TechnicalSheetModule } from './technicalSheet/technicalSheet.module';

@Module({
  imports: [ProductModule, TechnicalSheetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
