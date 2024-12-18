import { UseCase } from '../../shared/providers/usecase';
import { TeamModel } from '../model/team.model';
import { TeamRepositoryProvider } from '../repository/team-repository.provider';


export class RetriveTeamUseCase implements UseCase {

  constructor(
    private teamRepository: TeamRepositoryProvider<TeamModel>
  ) { }

  public execute = async (): Promise<TeamModel[]> => {

    return this.teamRepository.getList()

  }

}