import { MigrationInterface, QueryRunner } from "typeorm";

export class MyChampionship1734407247617 implements MigrationInterface {
    name = 'MyChampionship1734407247617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bracket_entity_round_enum" AS ENUM('round_of_16', 'quarter_final', 'third_place_playoff', 'semi_final', 'final')`);
        await queryRunner.query(`CREATE TABLE "bracket_entity" ("id" character varying(27) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "round" "public"."bracket_entity_round_enum" NOT NULL, "team_a_points" integer, "team_b_points" integer, "realized" boolean NOT NULL DEFAULT false, "team_a_id" character varying(27), "team_b_id" character varying(27), "championship_id" character varying(27), CONSTRAINT "PK_c4e5e1319411796a7e2ab9dba89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bracket_entity" ADD CONSTRAINT "FK_b914d317a006c79e99092000e44" FOREIGN KEY ("team_a_id") REFERENCES "team_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bracket_entity" ADD CONSTRAINT "FK_373ded73f30ebb54272c0dd7c9a" FOREIGN KEY ("team_b_id") REFERENCES "team_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bracket_entity" ADD CONSTRAINT "FK_5cc8c9791fbb8ed295e42fa25ff" FOREIGN KEY ("championship_id") REFERENCES "championship_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bracket_entity" DROP CONSTRAINT "FK_5cc8c9791fbb8ed295e42fa25ff"`);
        await queryRunner.query(`ALTER TABLE "bracket_entity" DROP CONSTRAINT "FK_373ded73f30ebb54272c0dd7c9a"`);
        await queryRunner.query(`ALTER TABLE "bracket_entity" DROP CONSTRAINT "FK_b914d317a006c79e99092000e44"`);
        await queryRunner.query(`DROP TABLE "bracket_entity"`);
        await queryRunner.query(`DROP TYPE "public"."bracket_entity_round_enum"`);
    }

}
