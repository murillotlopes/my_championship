import { MigrationInterface, QueryRunner } from "typeorm";

export class MyChampionship1734405776377 implements MigrationInterface {
    name = 'MyChampionship1734405776377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "championship_entity" ("id" character varying(27) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_aac79f234fcef412af47292a48f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "championship_entity"`);
    }

}
