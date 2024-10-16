import { Module } from '@nestjs/common';

import { TechnicalSheetService } from './technicalSheet.service';
import { TechnicalSheetController } from './technicalSheet.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [TechnicalSheetController],
  providers: [TechnicalSheetService, PrismaService],
  exports: [TechnicalSheetService],
})
export class TechnicalSheetModule {}
