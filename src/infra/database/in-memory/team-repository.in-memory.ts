import { TeamModel } from '../../../core/team/model/team.model';
import { TeamRepositoryProvider } from '../../../core/team/repository/team-repository.provider';
import { RepositoryInMemory } from './shared/repository-in-memory';

export default class TeamRepositoryInMemory extends RepositoryInMemory<TeamModel> implements TeamRepositoryProvider<TeamModel> {

}