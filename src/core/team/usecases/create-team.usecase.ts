import { UseCase } from '../../shared/providers/usecase';
import { TeamModel } from '../model/team.model';
import { TeamRepositoryProvider } from '../repository/team-repository.provider';


export class CreateTeamUseCase implements UseCase {

  constructor(
    private teamRepository: TeamRepositoryProvider<TeamModel>
  ) { }

  public execute = async (input: TeamModel) => {

    return this.teamRepository.save(input)

  }

}