import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticlesService } from 'src/articles/articles.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import Parser from 'rss-parser';
import { feedUrls } from 'src/common/const/feed-urls';
import { summarizeAndTag } from 'src/common/ai/summarize-and-tag';

interface CollectedArticle
  extends Omit<CreateArticleDto, 'summary' | 'tagNames'> {
  content: string;
}

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  private readonly parser = new Parser();

  constructor(
    private readonly articlesService: ArticlesService,
    private readonly preferencesService: PreferencesService,
  ) {}

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

            /**
             * rss에서 content가 짤려서 나오는 것 같음
             * url에서 데이터를 가져오는 로직이 필요함
             * 그 rss 만드는 사이트 보면 규칙 찾을 수 있던데 그런거 찾는게 좋을 듯
             * 이걸 어떻게 일반화하는지가 문제.
             * 단기간에 끝낼라면 그냥 html 최대한 틍으로 건내주는 것도 방법
             * 어차피 초기에는 적은 숫자만 파싱할거니까
             */
            content: item.content,
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
    const preferences = await this.preferencesService.findAll();

    const [summary, tags] = await summarizeAndTag(
      article.content,
      preferences.map((el) => el.name),
    );

    return [summary, tags];
  }
}
