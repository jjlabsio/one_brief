import { Prisma } from '@prisma/client';

export class CreateArticleDto implements Prisma.ArticleCreateInput {
  title: string;
  url: string;
  summary: string;
  source: string;
  published_at: string | Date | null;
  tagNames: string[];
}
