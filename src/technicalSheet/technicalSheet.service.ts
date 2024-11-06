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
      include: {
        ingredients: {
          include: {
            ingredient: true, // Inclui todos os dados dos ingredientes
          },
        },
      },
    });

    if (!technicalSheet) {
      throw new NotFoundException('Technical sheet not found');
    }

    return technicalSheet;
  }

  // Obter todas as fichas técnicas de um usuário
  async getAllTechnicalSheets(userId: string) {
    return this.prisma.technicalSheet.findMany({
      where: { userId },
      include: {
        ingredients: {
          include: {
            ingredient: true, // Inclui dados dos ingredientes
          },
        },
      },
    });
  }

  // Criar uma nova ficha técnica, incluindo ingredientes na relação
  async createTechnicalSheet(userId: string, data: CreateTechnicalSheetDto) {
    return this.prisma.technicalSheet.create({
      data: {
        dishName: data.dishName,
        created_at: new Date(),
        totalPrice: data.totalPrice,
        recipeSize: data.recipeSize,
        User: {
          connect: { id: userId },
        },
        ingredients: {
          create: data.ingredients.map((ingredient) => ({
            ingredient: {
              connect: { id: ingredient.ingredientId },
            },
            finalWeight: ingredient.finalWeight,
            finalPrice: ingredient.finalPrice,
          })),
        },
      },
    });
  }
}
