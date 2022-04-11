import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/http/auth/current-user';
import { ProductsService } from 'src/services/products.service';
import { CustomerService } from 'src/services/customers.service';

import { AutorizathionGuard } from '../../../http/auth/autorizathion.guard';
import { PurchasesService } from 'src/services/purchases.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-inputs';
import { Product } from '../models/products';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customerService: CustomerService,
  ) {}

  @Query(() => [Purchase])
  // @UseGuards(AutorizathionGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AutorizathionGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user,
  ) {
    let customer = await this.customerService.getCustomerByAuthUserId(user.sub);

    if (!customer) {
      customer = await this.customerService.createCustomer({
        authUserId: user.sub,
      });
    }

    return this.purchasesService.createPurchase({
      productId: data.productId,
      customerId: customer.id,
    });
  }
}
