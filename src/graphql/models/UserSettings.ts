import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_settings' })
@ObjectType()
export class UserSettings {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @PrimaryColumn({ name: 'user_id' })
  @Field(() => Int)
  userId: number;

  @Column({ name: 'receive_notifications', default:false })
  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Column({ name: 'receive_emails', default:false })
  @Field({ defaultValue: false })
  receiveEmails: boolean;
}
