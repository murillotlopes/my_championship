import { BracketModel } from '../../bracket/model/bracket.model';
import { Round } from '../../bracket/model/round.enum';
import { BracketRepositoryProvider } from '../../bracket/repository/bracket-repository.provider';
import { TeamModel } from '../../team/model/team.model';

export class DefineWinnerService {

  constructor(
    private bracketRepository: BracketRepositoryProvider<BracketModel>
  ) {

  }

  public async ofTheMatch(championshipId: string, bracket: BracketModel): Promise<TeamModel> {

    const { team_a, team_b } = bracket

    if (Number(bracket.team_a_points) > Number(bracket.team_b_points)) return team_a
    if (Number(bracket.team_b_points) > Number(bracket.team_a_points)) return team_b

    const teamAScore = await this.bracketRepository.score(championshipId, team_a.id)
    const teamBScore = await this.bracketRepository.score(championshipId, team_b.id)

    if (teamAScore > teamBScore) return team_a
    if (teamBScore > teamAScore) return team_b

    const quarterFinalList = await this.bracketRepository.getChampionship(championshipId, Round.QUARTER_FINAL)

    const bracketTeamA = quarterFinalList.find(item => item.team_a.id === team_a.id || item.team_b.id === team_a.id) as BracketModel
    const bracketTeamB = quarterFinalList.find(item => item.team_a.id === team_b.id || item.team_b.id === team_b.id) as BracketModel

    const teamAinserted_at = new Date(bracketTeamA.created_at as Date).getTime()
    const teamBinserted_at = new Date(bracketTeamB.created_at as Date).getTime()

    return teamAinserted_at >= teamBinserted_at ? team_a : team_b

  }

}