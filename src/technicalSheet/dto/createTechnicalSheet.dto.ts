import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateTechnicalSheetDto {
  @IsString()
  dishName: string;

  @IsNumber()
  totalPrice: number;

  @IsNumber()
  recipeSize: number;

  @IsArray()
  ingredients: string[];
}
