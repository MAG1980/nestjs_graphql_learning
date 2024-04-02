import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1712079073355 implements MigrationInterface {
  name = 'M1712079073355';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE "user_settings_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE "user_settings" ("id" INT DEFAULT nextval('"user_settings_id_seq"') NOT NULL, "user_id" int8 NOT NULL, "receive_notifications" bool NOT NULL, "receive_emails" bool NOT NULL, CONSTRAINT "PK_b8e14e8880d51dd68d690454f74" PRIMARY KEY ("id", "user_id"))`,
    );
    await queryRunner.query(`CREATE SEQUENCE "users_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" INT DEFAULT nextval('"users_id_seq"') NOT NULL, "username" varchar NOT NULL, "displayName" varchar NOT NULL, "settingsId" int8, "settingsUserId" int8, CONSTRAINT "REL_9a39895c9d700e25d2af5e0c0d" UNIQUE ("settingsId", "settingsUserId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9a39895c9d700e25d2af5e0c0d" ON "users" ("settingsId", "settingsUserId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_9a39895c9d700e25d2af5e0c0d8" FOREIGN KEY ("settingsId", "settingsUserId") REFERENCES "user_settings"("id","user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_9a39895c9d700e25d2af5e0c0d8"`,
    );
    await queryRunner.query(
      `DROP INDEX "users"@"IDX_9a39895c9d700e25d2af5e0c0d" CASCADE`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP SEQUENCE "users_id_seq"`);
    await queryRunner.query(`DROP TABLE "user_settings"`);
    await queryRunner.query(`DROP SEQUENCE "user_settings_id_seq"`);
  }
}
