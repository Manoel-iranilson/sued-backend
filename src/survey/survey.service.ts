import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';

@Injectable()
export class SurveyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSurveyDto: CreateSurveyDto) {
    return this.prisma.survey.create({
      data: createSurveyDto,
    });
  }

  async findAll() {
    return this.prisma.survey.findMany();
  }

  async findOne(id: string) {
    return this.prisma.survey.findUnique({
      where: { id },
    });
  }
}
