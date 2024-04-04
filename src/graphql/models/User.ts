import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserSettings } from './UserSettings';
// import { UserSettings } from './UserSettings';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  // @Field(() => ID) обязательно для id,
  // т.к. по умолчанию number интерпретируется GraphQL как Float
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column({ nullable: true })
  //Для необязательных полей недостаточно указать "?"
  @Field({ nullable: true })
  displayName?: string;

  //Указывать здесь { nullable: true } необязательно,
  //да и вообще, описывать поле settings здесь для QraphQL уже не нужно
  //т.к. свойства этого поля определяются в UserResolver.getUserSettings()
  //Но его требуется описать для TypeORM
  @OneToOne(() => UserSettings)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSettings;
}
