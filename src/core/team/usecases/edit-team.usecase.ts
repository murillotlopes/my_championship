import { UseCase } from '../../shared/providers/usecase';
import { TeamModel } from '../model/team.model';
import { TeamRepositoryProvider } from '../repository/team-repository.provider';


export class EditTeamUseCase implements UseCase {

  constructor(
    private teamRepository: TeamRepositoryProvider<TeamModel>
  ) { }

  public execute = async (input: TeamModel) => {

    const team = await this.teamRepository.getById(input.id)

    if (!team) throw new Error('Resource not found')

    return this.teamRepository.update(input, input.id as string)

  }

}