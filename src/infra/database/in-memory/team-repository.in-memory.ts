import { TeamModel } from '../../../core/team/model/team.model';
import { TeamRepositoryPort } from '../../../core/team/repository/team-repository.port';
import { RepositoryInMemory } from '../shared/repository-in-memory';

export default class TeamRepositoryInMemory extends RepositoryInMemory<TeamModel> implements TeamRepositoryPort<TeamModel> {

}