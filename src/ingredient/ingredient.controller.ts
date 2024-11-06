import { Controller, Get, Param } from '@nestjs/common';
import { IngredientService } from './ingredient.service';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  async findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  async getTechnicalSheet(@Param('id') id: string) {
    return this.ingredientService.getProduto(id);
  }
}
