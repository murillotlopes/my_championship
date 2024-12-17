import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BracketModel } from '../../../../core/bracket/model/bracket.model';
import { Round } from '../../../../core/bracket/model/round.enum';
import { BaseEntity } from './base.entity';
import { ChampionshipEntity } from './championship.entity';
import { TeamEntity } from './team.entity';

@Entity()
export class BracketEntity extends BaseEntity implements BracketModel {

  @Column({ type: 'enum', enum: Round })
  round: Round

  @Column({ type: 'int', nullable: true })
  team_a_points: number

  @Column({ type: 'int', nullable: true })
  team_b_points: number

  @ManyToOne(type => TeamEntity)
  @JoinColumn({ name: 'team_a_id' })
  team_a: TeamEntity

  @ManyToOne(type => TeamEntity)
  @JoinColumn({ name: 'team_b_id' })
  team_b: TeamEntity

  @ManyToOne(type => ChampionshipEntity)
  @JoinColumn({ name: 'championship_id' })
  championship: ChampionshipEntity

  @Column({ type: 'boolean', default: false })
  realized: boolean

}