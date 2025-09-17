import { Injectable } from '@nestjs/common';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    const { tagNames, ...data } = createArticleDto;

    return this.prisma.article.create({
      data: {
        title: data.title,
        url: data.url,
        summary: data.summary,
        source: data.source,
        published_at: data.published_at ?? null,
        tags: {
          connectOrCreate: tagNames.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        tags: true, // 생성 후 연결된 태그도 함께 반환
      },
    });
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
