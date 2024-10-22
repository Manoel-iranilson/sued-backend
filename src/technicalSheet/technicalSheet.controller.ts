import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  async getAllTechnicalSheets(@Query('email') email: string) {
    return this.technicalSheetService.getAllTechnicalSheets(email);
  }

  @Post()
  async create(@Body() data: CreateTechnicalSheetDto) {
    return this.technicalSheetService.createTechnicalSheet(data);
  }
}
