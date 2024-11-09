import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTechnicalSheetDto } from './dto/createTechnicalSheet.dto';

@Injectable()
export class TechnicalSheetService {
  constructor(private prisma: PrismaService) {}

  async getTechnicalSheet(id: string) {
    // Obter a ficha técnica pelo ID
    const technicalSheet = await this.prisma.technicalSheet.findUnique({
      where: { id },
    });

    if (!technicalSheet) {
      throw new NotFoundException('Technical sheet not found');
    }

    // Buscar as associações entre ficha técnica e ingredientes
    const technicalSheetIngredients =
      await this.prisma.technicalSheetIngredient.findMany({
        where: { technicalSheetId: id },
      });

    // Buscar os detalhes dos ingredientes relacionados
    const ingredientIds = technicalSheetIngredients.map(
      (tsi) => tsi.ingredientId,
    );
    const ingredients = await this.prisma.ingredient.findMany({
      where: { id: { in: ingredientIds } },
    });

    // Mapear os ingredientes para incluir detalhes adicionais
    const ingredientsWithDetails = technicalSheetIngredients.map((tsi) => {
      const ingredient = ingredients.find((ing) => ing.id === tsi.ingredientId);
      return {
        ...ingredient,
        finalWeight: tsi.finalWeight,
        finalPrice: tsi.finalPrice,
      };
    });

    // Retornar a ficha técnica com os ingredientes associados
    return {
      ...technicalSheet,
      ingredients: ingredientsWithDetails,
    };
  }

  // Obter todas as fichas técnicas de um usuário
  async getAllTechnicalSheets(userId: string) {
    // Obter todas as fichas técnicas do usuário
    const technicalSheets = await this.prisma.technicalSheet.findMany({
      where: { userId },
    });

    if (!technicalSheets || technicalSheets.length === 0) {
      throw new NotFoundException('No technical sheets found for this user');
    }

    // Obter os ingredientes associados a todas as fichas técnicas
    const technicalSheetIds = technicalSheets.map((sheet) => sheet.id);
    const technicalSheetIngredients =
      await this.prisma.technicalSheetIngredient.findMany({
        where: { technicalSheetId: { in: technicalSheetIds } },
      });

    // Buscar os detalhes dos ingredientes
    const ingredientIds = technicalSheetIngredients.map(
      (tsi) => tsi.ingredientId,
    );
    const ingredients = await this.prisma.ingredient.findMany({
      where: { id: { in: ingredientIds } },
    });

    // Associar ingredientes a suas respectivas fichas técnicas
    const technicalSheetsWithIngredients = technicalSheets.map((sheet) => {
      const relatedIngredients = technicalSheetIngredients
        .filter((tsi) => tsi.technicalSheetId === sheet.id)
        .map((tsi) => {
          const ingredient = ingredients.find(
            (ing) => ing.id === tsi.ingredientId,
          );
          return {
            ...ingredient,
            finalWeight: tsi.finalWeight,
            finalPrice: tsi.finalPrice,
          };
        });

      return { ...sheet, ingredients: relatedIngredients };
    });

    return technicalSheetsWithIngredients;
  }

  // Criar uma nova ficha técnica, incluindo ingredientes na relação
  async createTechnicalSheet(userId: string, data: CreateTechnicalSheetDto) {
    // Verificar se todos os ingredientes existem
    const ingredientIds = data.ingredients.map(
      (ingredient) => ingredient.ingredientId,
    );
    const existingIngredients = await this.prisma.ingredient.findMany({
      where: { id: { in: ingredientIds } },
    });

    if (existingIngredients.length !== ingredientIds.length) {
      throw new NotFoundException('One or more ingredients not found');
    }

    // Criação da ficha técnica
    const technicalSheet = await this.prisma.technicalSheet.create({
      data: {
        dishName: data.dishName,
        created_at: new Date(),
        totalPrice: data.totalPrice,
        recipeSize: data.recipeSize,
        userId,
      },
    });

    // Criação das associações com os ingredientes
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
