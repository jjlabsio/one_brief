# One Brief

## 작업순서

### feat/api-news

### feat/api-preferences

### feat/auth. (auth ui, nextauth)

### feat/ui-base (theme, component)

### feat/ui-main

### feat/ui-preferences

### feat/user-settings

## db 규칙

### mvp 단계

- apps/web : pull만 가능
- apps/api : push만 가능

### mvp 이후

> https://www.prisma.io/docs/orm/prisma-migrate/getting-started

prisma migrate 이후 apps/api에서 push -> migrate로 변경

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

    .
    ├── apps
    │   ├── api                       # NestJS app (https://nestjs.com).
    │   └── web                       # Next.js app (https://nextjs.org).
    └── packages
        ├── @repo/api                 # Shared `NestJS` resources.
        ├── @repo/eslint-config       # `eslint` configurations (includes `prettier`)
        ├── @repo/jest-config         # `jest` configurations
        ├── @repo/typescript-config   # `tsconfig.json`s used throughout the monorepo
        └── @repo/ui                  # Shareable stub React component library.

Each package and application are 100% [TypeScript](https://www.typescriptlang.org/) safe.

### Utilities

This `Turborepo` has some additional tools already set for you:

- [TypeScript](https://www.typescriptlang.org/) for static type-safety
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Jest](https://prettier.io) & [Playwright](https://playwright.dev/) for testing
