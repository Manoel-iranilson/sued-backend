import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TechnicalSheetService } from './technicalSheet.service';
import { CreateTechnicalSheetDto } from './dto/createTechnicalSheet.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('technicalSheet')
export class TechnicalSheetController {
  constructor(private readonly technicalSheetService: TechnicalSheetService) {}

  @Get(':id')
  async getTechnicalSheet(@Param('id') id: string) {
    return this.technicalSheetService.getTechnicalSheet(id);
  }

  @Get()
  async getAllTechnicalSheets(@CurrentUser() user: User) {
    return this.technicalSheetService.getAllTechnicalSheets(user.id);
  }

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() data: CreateTechnicalSheetDto,
  ) {
    return this.technicalSheetService.createTechnicalSheet(user.id, data);
  }
}
