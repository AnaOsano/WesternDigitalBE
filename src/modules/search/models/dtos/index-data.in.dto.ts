import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IndexDataDto {
  @Field()
    id: string;
  
  @Field()
    title: string;

  @Field()
    content: string;
}
