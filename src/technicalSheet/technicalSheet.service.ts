import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTechnicalSheetDto } from './dto/createTechnicalSheet.dto';

@Injectable()
export class TechnicalSheetService {
  constructor(private prisma: PrismaService) {}

  async getTechnicalSheet(id: string) {
    // Busca a ficha técnica pelo ID
    const technicalSheet = await this.prisma.technicalSheet.findUnique({
      where: {
        id: id,
      },
    });

    if (!technicalSheet) {
      throw new Error('Technical sheet not found');
    }

    // Faz uma busca pelos ingredientes utilizando os ingredientIds
    const ingredients = await this.prisma.ingredient.findMany({
      where: {
        id: {
          in: technicalSheet.ingredients.map(
            (ingredient) => ingredient.ingredientId,
          ),
        },
      },
    });

    // Retorna a ficha técnica juntamente com os detalhes dos ingredientes
    return {
      ...technicalSheet,
      ingredients,
    };
  }

  async getAllTechnicalSheets(email: string) {
    return this.prisma.technicalSheet.findMany({
      where: {
        email: email,
      },
    });
  }

  async createTechnicalSheet(data: CreateTechnicalSheetDto) {
    return this.prisma.technicalSheet.create({
      data: {
        dishName: data.dishName,
        created_at: new Date(),
        totalPrice: data.totalPrice,
        recipeSize: data.recipeSize,
        email: data.email,
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
