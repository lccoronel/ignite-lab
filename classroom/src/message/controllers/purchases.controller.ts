import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

export interface PurchaseCreatedPayload {
  custumer: {
    authUserId: string;
  };
  product: {
    id: string;
    title: string;
    slug: string;
  };
}

@Controller()
export class PurchaseController {
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    console.log(payload);
  }
}
