import { Prisma } from '@prisma/client';

export class CreatePreferenceDto implements Prisma.PreferenceCreateInput {
  name: string;
}
