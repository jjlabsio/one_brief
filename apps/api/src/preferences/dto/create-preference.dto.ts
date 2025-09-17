import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePreferenceDto implements Prisma.PreferenceCreateInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}
