import { MigrationInterface, QueryRunner } from "typeorm";

export class M1712264330621 implements MigrationInterface {
  name = 'M1712264330621'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_settings"
        ALTER COLUMN "receive_notifications" SET DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "user_settings"
        ALTER COLUMN "receive_emails" SET DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_settings"
        ALTER COLUMN "receive_emails" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "user_settings"
        ALTER COLUMN "receive_notifications" DROP DEFAULT`);
  }

}
