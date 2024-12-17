import { MigrationInterface, QueryRunner } from "typeorm";

export class MyChampionship1734406075087 implements MigrationInterface {
    name = 'MyChampionship1734406075087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team_entity" ("id" character varying(27) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_729030db84428f430d098ee9f4d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "team_entity"`);
    }

}
