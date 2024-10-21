import { IsString, IsEmail, IsBoolean, IsEnum } from 'class-validator';

enum TechnicalSheetKnowledge {
  NO_KNOWLEDGE = 'NO_KNOWLEDGE',
  KNOWS_BUT_NEVER_USED = 'KNOWS_BUT_NEVER_USED',
  USED_LITTLE = 'USED_LITTLE',
  ALWAYS_USE = 'ALWAYS_USE',
}

enum TechnicalSheetSkill {
  NO = 'NO',
  THINKS_KNOW = 'THINKS_KNOW',
  KNOWS = 'KNOWS',
}

enum ImportanceKnowledge {
  NO = 'NO',
  THINKS_KNOW = 'THINKS_KNOW',
  KNOWS = 'KNOWS',
}

export class CreateSurveyDto {
  @IsString()
  studentOrProfessional: string;

  @IsBoolean()
  worksInFoodIndustry: boolean;

  @IsEnum(TechnicalSheetKnowledge)
  knowsTechnicalSheet: TechnicalSheetKnowledge;

  @IsEnum(TechnicalSheetSkill)
  canMakeTechnicalSheet: TechnicalSheetSkill;

  @IsEnum(ImportanceKnowledge)
  knowsImportance: ImportanceKnowledge;

  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  consent: boolean;
}
