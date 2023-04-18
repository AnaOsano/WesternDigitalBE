import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IndexResultsDto {
  @Field()
    indexedCount: number;
  @Field()
    indexedIds: string[];
}
