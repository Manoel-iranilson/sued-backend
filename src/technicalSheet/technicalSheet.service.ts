import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTechnicalSheetDto } from './dto/createTechnicalSheet.dto';

@Injectable()
export class TechnicalSheetService {
  constructor(private prisma: PrismaService) {}

  async getTechnicalSheet(id: string) {
    return this.prisma.technicalSheet.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getAllTechnicalSheets() {
    return this.prisma.technicalSheet.findMany();
  }

  async createTechnicalSheet(data: CreateTechnicalSheetDto) {
    return this.prisma.technicalSheet.create({
      data: {
        dishName: data.dishName,
        created_at: new Date(),
        totalPrice: data.totalPrice,
        recipeSize: data.recipeSize,
        ingredients: {
          set: data.ingredients.map((ingredient) => ({
            ingredientId: ingredient.ingredientId,
            finalWeight: ingredient.finalWeight,
            finalPrice: ingredient.finalPrice,
          })),
        },
      },
    });
  }
}
