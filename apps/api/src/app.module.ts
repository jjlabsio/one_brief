import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule, LinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
