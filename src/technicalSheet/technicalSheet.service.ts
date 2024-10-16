import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TechnicalSheetService {
  constructor(private prisma: PrismaService) {}

  async getTechnicalSheet(id: string) {
    return this.prisma.technicalSheet.findUnique({
      where: {
        id: id,
      },
      include: {
        products: true,
      },
    });
  }

  async getAllTechnicalSheets() {
    return this.prisma.technicalSheet.findMany({
      include: {
        products: true,
      },
    });
  }

  async createTechnicalSheet(
    data: Prisma.TechnicalSheetCreateInput & { products: string[] },
  ) {
    return this.prisma.technicalSheet.create({
      data: {
        dishName: data.dishName,
        created_at: new Date(),
        totalPrice: data.totalPrice,
        recipeSize: data.recipeSize,
        products: {
          connect: data.products.map((productId) => ({
            id: productId,
          })),
        },
      },
    });
  }
}
