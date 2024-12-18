import { BracketModel } from '../../bracket/model/bracket.model';
import { BracketRepositoryProvider } from '../../bracket/repository/bracket-repository.provider';
import { UseCase } from '../../shared/providers/usecase';
import { TeamRepositoryProvider } from '../repository/team-repository.provider';
import { TeamModel } from './../model/team.model';


export class DeleteTeamUseCase implements UseCase {

  constructor(
    private teamRepository: TeamRepositoryProvider<TeamModel>,
    private bracketRepository: BracketRepositoryProvider<BracketModel>
  ) { }

  public execute = async (input: string): Promise<TeamModel> => {

    const team = await this.teamRepository.getById(input)

    if (!team) throw new Error('Resource not found')

    const championshipList = await this.bracketRepository.getChampionship(input)

    if (championshipList.find(item => item.team_a.id === input || item.team_b.id === input)) throw new Error('The team is already registered in a match and cannot be deleted')

    return this.teamRepository.delete(input)

  }

}