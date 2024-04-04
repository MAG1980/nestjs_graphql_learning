import { MigrationInterface, QueryRunner } from 'typeorm';

export class M1712224132221 implements MigrationInterface {
  name = 'M1712224132221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "displayName" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "displayName" SET NOT NULL`,
    );
  }
}
