import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCustomerPramas {
  authUserId: string;
}

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({ where: { authUserId } });
  }

  createCustomer({ authUserId }: CreateCustomerPramas) {
    return this.prisma.customer.create({ data: { authUserId } });
  }
}
