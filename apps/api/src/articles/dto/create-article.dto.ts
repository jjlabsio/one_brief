import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class CreateArticleDto implements Prisma.ArticleCreateInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsOptional()
  @Type(() => Date) // 문자열 → Date 변환
  @IsDate()
  published_at: Date | null;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tagNames: string[];
}
