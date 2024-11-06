import { IsString, IsEmail, IsBoolean, IsDate } from 'class-validator';

export class CreateSurveyDto {
  @IsString()
  studentOrProfessional: string;

  @IsBoolean()
  worksInFoodIndustry: boolean;

  @IsString()
  knowsTechnicalSheet: string;

  @IsString()
  canMakeTechnicalSheet: string;

  @IsString()
  knowsImportance: string;

  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  consent: boolean;

  @IsDate()
  created_at: Date;
}
