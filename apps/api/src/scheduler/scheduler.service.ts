import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticlesService } from 'src/articles/articles.service';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import Parser from 'rss-parser';
import { feedUrls } from 'src/common/const/feed-urls';

type CollectedArticle = Omit<CreateArticleDto, 'summary' | 'tagNames'>;

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  private readonly parser = new Parser();

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

    if (createArticleDtos.length > 0) {
      try {
        await this.articlesService.createMany(createArticleDtos);

        this.logger.log(`${createArticleDtos.length}개 뉴스 수집 완료`);
      } catch (error) {
        this.logger.error('DB 저장 실패', error);
      }
    }

    this.logger.log('데이터 수집 완료');
  }

  private async collectArticles(): Promise<CollectedArticle[]> {
    const articles: CollectedArticle[] = [];

    for (const { source, url } of feedUrls.news) {
      try {
        const feed = await this.parser.parseURL(url);

        for (const item of feed.items) {
          const article: CollectedArticle = {
            title: item.title,
            url: item.link,
            source: source,
            published_at: item.isoDate ? new Date(item.isoDate) : null,
          };

          articles.push(article);

          this.logger.debug(`Get article: ${article.title}`);
        }
      } catch (error) {
        this.logger.error(`Failed to fetch ${url}: ${error}`);
      }
    }

    return articles;
  }

  private async summarizeAndTagArticle(
    article: CollectedArticle,
  ): Promise<[string, string[]]> {
    // todo
    const summary = '';
    const tags = ['재테크'];
    return [summary, tags];
  }
}
