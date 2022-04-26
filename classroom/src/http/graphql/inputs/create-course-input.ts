import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInputtype {
  @Field()
  title: string;
}
