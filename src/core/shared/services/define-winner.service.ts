import { BracketModel } from '../../bracket/model/bracket.model';
import { BracketRepositoryPort } from '../../bracket/repository/bracket-repository.port';
import { TeamModel } from '../../team/model/team.model';

export class DefineWinnerService {

  constructor(
    private bracketRepository: BracketRepositoryPort<BracketModel>
  ) {

  }

  public async define(championshipId: string, bracket: BracketModel): Promise<TeamModel> {

    const { team_a, team_b } = bracket

    const teamAScore = await this.bracketRepository.score(championshipId, team_a.id)
    const teamBScore = await this.bracketRepository.score(championshipId, team_b.id)

    if (teamAScore > teamBScore) return team_a
    if (teamBScore > teamAScore) return team_b

    const teamAcreated_at = new Date(team_a.created_at as Date).getTime()
    const teamBcreated_at = new Date(team_b.created_at as Date).getTime()

    return teamAcreated_at > teamBcreated_at ? team_a : team_b

  }

}