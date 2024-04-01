import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  // @Field(() => ID) обязательно для id,
  // т.к. по умолчанию number интерпретируется GraphQL как Float
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  //Для необязательных полей недостаточно указать "?"
  @Field({ nullable: true })
  displayName?: string;
}
