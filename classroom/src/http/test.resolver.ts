import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from 'src/database/prisma/prisma.service';
import { AutorizathionGuard } from 'src/http/auth/autorizathion.guard';

@Resolver()
export class TestResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  @UseGuards(AutorizathionGuard)
  hello() {
    return 'Hello Lucas';
  }
}
