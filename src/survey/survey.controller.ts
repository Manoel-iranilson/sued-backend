import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveyService.create(createSurveyDto);
  }

  @Get()
  async findAll() {
    return this.surveyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.surveyService.findOne(id);
  }
}
