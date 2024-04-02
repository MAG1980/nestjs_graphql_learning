import { Field, Int, ObjectType } from '@nestjs/graphql';
// import { UserSettings } from './UserSettings';

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

  //Указывать здесь { nullable: true } необязательно,
  //да и вообще, описывать поле settings здесь уже не нужно
  //т.к. свойства этого поля определяются в UserResolver.getUserSettings()
  // @Field({ nullable: true })
  // settings?: UserSettings;
}
