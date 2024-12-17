import { ChampionshipRepositoryProvider } from '../../../../core/championship/repository/championship-repository.provider';
import { ChampionshipEntity } from '../entities/championship.entity';
import { RepositoryTypeORM } from './shared/repository-typeorm';

export class ChampionshipRepositoryTypeORM extends RepositoryTypeORM<ChampionshipEntity> implements ChampionshipRepositoryProvider<ChampionshipEntity> {

  constructor() {
    super(ChampionshipEntity)
  }

}