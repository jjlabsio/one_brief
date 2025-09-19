import type { Config } from 'jest';
import { config as baseConfig } from './base';

export const nestConfig = {
  ...baseConfig,
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',

  // 절대경로
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/../src/$1',
  },
} as const satisfies Config;
