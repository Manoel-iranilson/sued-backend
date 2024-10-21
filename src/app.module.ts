import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TechnicalSheetModule } from './technicalSheet/technicalSheet.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [IngredientModule, TechnicalSheetModule, SurveyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
