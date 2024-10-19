import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TechnicalSheetModule } from './technicalSheet/technicalSheet.module';
import { IngredientModule } from './ingredient/ingredient.module';

@Module({
  imports: [IngredientModule, TechnicalSheetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
