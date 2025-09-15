import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { PreferencesModule } from './preferences/preferences.module';
import { PrismaModule } from './prisma/prisma.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [ConfigModule, PreferencesModule, PrismaModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
