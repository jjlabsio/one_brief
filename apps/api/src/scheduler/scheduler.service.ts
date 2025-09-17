import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticlesService } from 'src/articles/articles.service';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly articlesService: ArticlesService) {}

  @Cron(CronExpression.EVERY_DAY_AT_6PM, {
    timeZone: 'Asia/Seoul',
  })
  async collectAndSummarizeArticles() {
    this.logger.log('데이터 수집 시작');

    const articles = await this.collectArticles();
    const createArticleDtos: CreateArticleDto[] = [];

    for (const article of articles) {
      try {
        const [summary, tags] = await this.summarizeAndTagArticle(article);

        const createArticleDto: CreateArticleDto = {
          title: article.title,
          url: article.url,
          summary,
          source: article.source,
          published_at: article.published_at,
          tagNames: tags,
        };
        createArticleDtos.push(createArticleDto);

        this.logger.log(`Summarize and tag success: ${article.title}`);
      } catch (error) {
        this.logger.error(`Summarize and tag fail: ${article.title}`, error);
      }
    }

    this.logger.log('데이터 수집 완료');
  }

  private async collectArticles(): Promise<
    Omit<CreateArticleDto, 'summary' | 'tagNames'>[]
  > {
    // todo
    return [];
  }

  private async summarizeAndTagArticle(
    article: Omit<CreateArticleDto, 'summary' | 'tagNames'>,
  ): Promise<[string, string[]]> {
    // todo
    const summary = '';
    const tags = [''];
    return [summary, tags];
  }
}
