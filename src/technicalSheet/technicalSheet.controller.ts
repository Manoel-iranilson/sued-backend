import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TechnicalSheetService } from './technicalSheet.service';
import { CreateTechnicalSheetDto } from './dto/createTechnicalSheet.dto';

@Controller('technicalSheet')
export class TechnicalSheetController {
  constructor(private readonly technicalSheetService: TechnicalSheetService) {}

  @Get(':id')
  async getTechnicalSheet(@Param('id') id: string) {
    return this.technicalSheetService.getTechnicalSheet(id);
  }

  @Get()
  async getAllTechnicalSheets() {
    return this.technicalSheetService.getAllTechnicalSheets();
  }

  @Post()
  async create(@Body() data: CreateTechnicalSheetDto) {
    return this.technicalSheetService.createTechnicalSheet(data);
  }
}
