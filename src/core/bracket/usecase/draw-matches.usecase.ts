import { ChampionshipModel } from '../../championship/model/championship.model';
import { ChampionshipRepositoryProvider } from '../../championship/repository/championship-repository.provider';
import { ForbiddenException } from '../../shared/errs/forbidden-exception';
import { NotFoundException } from '../../shared/errs/not-found-exception';
import { UseCase } from '../../shared/providers/usecase';
import { ShuffleArray } from '../../shared/services/shuffle-array.service';
import { TeamModel } from '../../team/model/team.model';
import { TeamRepositoryProvider } from '../../team/repository/team-repository.provider';
import { BracketModel } from '../model/bracket.model';
import { DrawMatchesInput } from '../model/draw-matches.input';
import { DrawMatchesOutput } from '../model/draw-matches.output';
import { Round } from '../model/round.enum';
import { BracketRepositoryProvider } from '../repository/bracket-repository.provider';

export class DrawMatchesUseCase implements UseCase {

  constructor(
    private bracketRepository: BracketRepositoryProvider<BracketModel>,
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>,
    private teamRepository: TeamRepositoryProvider<TeamModel>,
    private shuffleArray: ShuffleArray
  ) {

  }

  public execute = async (input: DrawMatchesInput): Promise<DrawMatchesOutput[]> => {

    const championship = await this.championshipRepository.getById(input.championshipId)

    if (!championship) throw new NotFoundException('Championship not found')

    const quarterDrawn = await this.bracketRepository.getChampionship(input.championshipId, Round.QUARTER_FINAL)

    if (quarterDrawn.length) throw new ForbiddenException('The championship has already been drawn')

    const teamsList: TeamModel[] = []
    for (const id of input.teams) {
      const team = await this.teamRepository.getById(id) as TeamModel

      if (!team) throw new NotFoundException('Team not found')

      teamsList.push(team)
    }

    const shuffledTeams = this.shuffleArray.shuffle(teamsList)

    for (let i = 0; i < shuffledTeams.length; i += 2) {

      const bracket: BracketModel = {
        round: Round.QUARTER_FINAL,
        team_a: shuffledTeams[i],
        team_b: shuffledTeams[i + 1],
        championship,
        realized: false
      }

      await this.bracketRepository.save(bracket)

    }

    const quarterFinalList = await this.bracketRepository.getChampionship(championship.id, Round.QUARTER_FINAL)

    const drawMatchesOutputList: DrawMatchesOutput[] = []

    for (const bracket of quarterFinalList) {

      const matchups: DrawMatchesOutput = {
        round: bracket.round,
        team_a: bracket.team_a,
        team_b: bracket.team_b,
      }

      drawMatchesOutputList.push(matchups)

    }

    return drawMatchesOutputList

  }

}