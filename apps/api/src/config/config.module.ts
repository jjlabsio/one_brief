import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string(),

  // CORS
  CORS_ORIGIN: z.string(),

  // OPENAI
  OPENAI_API_KEY: z.string(),
});

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `${process.cwd()}/.env`,
      validate: (config: Record<string, unknown>) => {
        try {
          return envSchema.parse(config);
        } catch (error) {
          console.error('Environment validation error: ', error);
          throw error;
        }
      },
    }),
  ],
})
export class ConfigModule {}
