import { IsString, IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class IngredientDetailDto {
  @IsString()
  ingredientId: string;

  @IsNumber()
  finalWeight: number;

  @IsNumber()
  finalPrice: number;
}

export class CreateTechnicalSheetDto {
  @IsString()
  dishName: string;

  @IsNumber()
  totalPrice: number;

  @IsNumber()
  recipeSize: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDetailDto)
  ingredients: IngredientDetailDto[];

  @IsString()
  email: string;
}
