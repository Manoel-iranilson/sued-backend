import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.ingredient.findMany();
  }

  async getProduto(id: string) {
    return this.prisma.technicalSheet.findUnique({
      where: {
        id: id,
      },
    });
  }
}
