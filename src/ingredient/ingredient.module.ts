import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';

@Module({
  controllers: [IngredientController],
  providers: [IngredientService, PrismaService],
  exports: [IngredientService],
})
export class IngredientModule {}
