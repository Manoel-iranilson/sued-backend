import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TechnicalSheetModule } from './technicalSheet/technicalSheet.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    AuthModule,
    IngredientModule,
    TechnicalSheetModule,
    UserModule,
    SurveyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
