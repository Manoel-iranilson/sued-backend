import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTechnicalSheetDto } from './dto/createTechnicalSheet.dto';

@Injectable()
export class TechnicalSheetService {
  constructor(private prisma: PrismaService) {}

  // Obter uma ficha técnica por ID, incluindo os ingredientes associados
  async getTechnicalSheet(id: string) {
    const technicalSheet = await this.prisma.technicalSheet.findUnique({
      where: { id },
    });

    if (!technicalSheet) {
      throw new NotFoundException('Technical sheet not found');
    }

    // Obter os ingredientes associados manualmente
    const ingredients = await this.prisma.technicalSheetIngredient.findMany({
      where: { technicalSheetId: id },
      include: {
        ingredient: true, // Inclui os dados do ingrediente
      },
    });

    return {
      ...technicalSheet,
      ingredients, // Inclui os ingredientes na resposta
    };
  }
  // Obter todas as fichas técnicas de um usuário
  async getAllTechnicalSheets(userId: string) {
    const technicalSheets = await this.prisma.technicalSheet.findMany({
      where: { userId },
    });

    if (!technicalSheets || technicalSheets.length === 0) {
      throw new NotFoundException('No technical sheets found for this user');
    }

    // Obter os ingredientes para cada ficha técnica
    const technicalSheetsWithIngredients = await Promise.all(
      technicalSheets.map(async (sheet) => {
        const ingredients = await this.prisma.technicalSheetIngredient.findMany(
          {
            where: { technicalSheetId: sheet.id },
            include: {
              ingredient: true,
            },
          },
        );

        return { ...sheet, ingredients };
      }),
    );

    return technicalSheetsWithIngredients;
  }

  // Criar uma nova ficha técnica, incluindo ingredientes na relação
  async createTechnicalSheet(userId: string, data: CreateTechnicalSheetDto) {
    // Cria a ficha técnica
    const technicalSheet = await this.prisma.technicalSheet.create({
      data: {
        dishName: data.dishName,
        created_at: new Date(),
        totalPrice: data.totalPrice,
        recipeSize: data.recipeSize,
        userId,
      },
    });

    // Cria as associações com os ingredientes
    const ingredients = data.ingredients.map((ingredient) => ({
      technicalSheetId: technicalSheet.id,
      ingredientId: ingredient.ingredientId,
      finalWeight: ingredient.finalWeight,
      finalPrice: ingredient.finalPrice,
    }));

    await this.prisma.technicalSheetIngredient.createMany({
      data: ingredients,
    });

    return {
      ...technicalSheet,
      ingredients,
    };
  }
}
