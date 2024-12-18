import { TeamRepositoryProvider } from '../../../../core/team/repository/team-repository.provider';
import { TeamEntity } from '../entities/team.entity';
import { RepositoryTypeORM } from './shared/repository-typeorm';

export class TeamRepositoryTypeORM extends RepositoryTypeORM<TeamEntity> implements TeamRepositoryProvider<TeamEntity> {

  constructor() {
    super(TeamEntity)
  }


}