import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';

import { DatabaseModule } from '../database/database.module';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { CustomerService } from 'src/services/customers.service';
import { CustomerResolver } from './graphql/resolvers/customers.resolver';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessageModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // PRODUCTS
    ProductsResolver,
    ProductsService,

    //PURCHASES
    PurchasesResolver,
    PurchasesService,

    //CUSTOMERs
    CustomerService,
    CustomerResolver,
  ],
})
export class HttpModule {}
