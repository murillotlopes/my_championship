import { Column, Entity, OneToMany } from 'typeorm';
import { TeamModel } from '../../../../core/team/model/team.model';
import { BaseEntity } from './base.entity';
import { BracketEntity } from './bracket.entity';

@Entity()
export class TeamEntity extends BaseEntity implements TeamModel {

  @Column({ type: 'varchar' })
  name: string

  @OneToMany(type => BracketEntity, (e) => e.team_a)
  teams_a: BracketEntity[]

  @OneToMany(type => BracketEntity, (e) => e.team_b)
  teams_b: BracketEntity[]

}