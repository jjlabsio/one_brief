import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Preference as PreferenceModel } from '@prisma/client';
import { CreatePreferenceDto } from './dto/create-preference.dto';

@Injectable()
export class PreferencesService {
  constructor(private prisma: PrismaService) {}

  create(createPreferenceDto: CreatePreferenceDto) {
    const { name } = createPreferenceDto;

    return this.prisma.preference.create({
      data: {
        name,
      },
    });
  }

  findAll(): Promise<PreferenceModel[]> {
    return this.prisma.preference.findMany();
  }
}
