import { BracketModel } from '../../bracket/model/bracket.model';
import { Round } from '../../bracket/model/round.enum';
import { BracketRepositoryProvider } from '../../bracket/repository/bracket-repository.provider';
import { ForbiddenException } from '../../shared/errs/forbidden-exception';
import { NotFoundException } from '../../shared/errs/not-found-exception';
import { UseCase } from '../../shared/providers/usecase';
import { DefineWinnerService } from '../../shared/services/define-winner.service';
import { GenerateMatchScoreService } from '../../shared/services/generate-match-score.service';
import { ShuffleArray } from '../../shared/services/shuffle-array.service';
import { TeamModel } from '../../team/model/team.model';
import { ChampionshipModel } from '../model/championship.model';
import { QuarterFinalOutput } from '../model/quarter-final.output';
import { ChampionshipRepositoryProvider } from '../repository/championship-repository.provider';

export class QuarterFinalResultUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>,
    private bracketRepository: BracketRepositoryProvider<BracketModel>,
    private defineWinnerService: DefineWinnerService,
    private generateMatchScoreService: GenerateMatchScoreService,
    private shuffleArray: ShuffleArray
  ) { }

  public execute = async (input: string): Promise<QuarterFinalOutput> => {

    const championship = await this.championshipRepository.getById(input)

    if (!championship) throw new NotFoundException('Championship not found')

    const quarter_final = await this.bracketRepository.getChampionship(championship.id, Round.QUARTER_FINAL)

    if (!quarter_final.length) throw new ForbiddenException('Championship without registered teams. Register them first before you get the results of the quarterfinals')

    if (quarter_final.find(item => item.realized)) throw new ForbiddenException('Quarter final already classified')

    for (const bracket of quarter_final) {

      const { teamAscore, teamBscore } = await this.generateMatchScoreService.getMatchScores()

      bracket.team_a_points = teamAscore
      bracket.team_b_points = teamBscore
      bracket.realized = true

      await this.bracketRepository.update(bracket, bracket.id)
    }

    const quarterFinalWinners: TeamModel[] = []

    for (const match of quarter_final) {

      const team = await this.defineWinnerService.ofTheMatch(championship.id as string, match)

      quarterFinalWinners.push(team)

    }

    const shuffledTeams = this.shuffleArray.shuffle(quarterFinalWinners)

    for (let i = 0; i < shuffledTeams.length; i += 2) {

      const teamA = shuffledTeams[i]
      const teamB = shuffledTeams[i + 1]

      const obj: BracketModel = {
        round: Round.SEMI_FINAL,
        championship,
        team_a: teamA,
        team_b: teamB,
        realized: false
      }

      await this.bracketRepository.save(obj)

    }

    const semi_final = await this.bracketRepository.getChampionship(championship.id, Round.SEMI_FINAL)

    const quarterFinalOutput: QuarterFinalOutput = {
      quarter_final,
      semi_final
    }

    return quarterFinalOutput

  }

}