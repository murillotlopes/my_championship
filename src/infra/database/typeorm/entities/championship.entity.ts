import { Column, Entity, OneToMany } from 'typeorm';
import { ChampionshipModel } from '../../../../core/championship/model/championship.model';
import { BaseEntity } from './base.entity';
import { BracketEntity } from './bracket.entity';

@Entity()
export class ChampionshipEntity extends BaseEntity implements ChampionshipModel {

  @Column({ type: 'varchar' })
  name: string

  @OneToMany(type => BracketEntity, (e) => e.championship)
  brackets: BracketEntity[]

}