import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ArticlesModule } from 'src/articles/articles.module';
import { PreferencesModule } from 'src/preferences/preferences.module';

@Module({
  imports: [ScheduleModule.forRoot(), ArticlesModule, PreferencesModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
