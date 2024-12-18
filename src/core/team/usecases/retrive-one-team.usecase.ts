import { NotFoundException } from '../../shared/errs/not-found-exception';
import { UseCase } from '../../shared/providers/usecase';
import { TeamModel } from '../model/team.model';
import { TeamRepositoryProvider } from '../repository/team-repository.provider';


export class RetriveOneTeamUseCase implements UseCase {

  constructor(
    private teamRepository: TeamRepositoryProvider<TeamModel>
  ) { }

  public execute = async (input: string): Promise<TeamModel> => {

    const team = await this.teamRepository.getById(input)

    if (!team) throw new NotFoundException('Team not found')

    return this.teamRepository.getById(input)

  }

}