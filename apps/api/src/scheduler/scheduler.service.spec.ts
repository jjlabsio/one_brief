import { beforeEach, describe, it } from '@jest/globals';
import { SchedulerService } from './scheduler.service';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from 'src/articles/articles.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PreferencesService } from 'src/preferences/preferences.service';

describe('SchedulerService', () => {
  let service: SchedulerService;

  beforeEach(async () => {
    Logger.overrideLogger(['log']);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulerService,
        ArticlesService,
        PrismaService,
        PreferencesService,
      ],
    }).compile();

    service = module.get<SchedulerService>(SchedulerService);
  });

  it(
    '뉴스 수집',
    async () => {
      await service.collectAndSummarizeArticles();
    },
    1000 * 60 * 2,
  );
});
