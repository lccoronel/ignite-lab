import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AutorizathionGuard } from '../../../http/auth/autorizathion.guard';
import { CustomerService } from 'src/services/customers.service';
import { Customer } from '../models/customer';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { Purchase } from '../models/purchase';
import { PurchasesService } from 'src/services/purchases.service';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customerService: CustomerService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AutorizathionGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField(() => Purchase)
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }
}
