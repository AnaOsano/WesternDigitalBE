// search-result.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SearchResultDto {
  @Field()
    id: string;

  @Field()
    title: string;

  @Field()
    content: string;
}
