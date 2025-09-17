import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ArticlesModule } from 'src/articles/articles.module';

@Module({
  imports: [ScheduleModule.forRoot(), ArticlesModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
