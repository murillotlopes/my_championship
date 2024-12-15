import { UseCase } from '../../shared/ports/usecase';
import { TeamModel } from '../model/team.model';
import { TeamRepositoryPort } from '../repository/team-repository.port';


export class CreateTeamUseCase implements UseCase {

  constructor(
    private teamRepository: TeamRepositoryPort<TeamModel>
  ) { }

  public execute = async (input: TeamModel) => {

    return this.teamRepository.save(input)

  }

}