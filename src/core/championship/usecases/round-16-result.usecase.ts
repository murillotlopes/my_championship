import { BracketModel } from '../../bracket/model/bracket.model';
import { Round } from '../../bracket/model/round.enum';
import { BracketRepositoryProvider } from '../../bracket/repository/bracket-repository.provider';
import { ForbiddenException } from '../../shared/errs/forbidden-exception';
import { NotFoundException } from '../../shared/errs/not-found-exception';
import { UseCase } from '../../shared/providers/usecase';
import { DefineWinnerService } from '../../shared/services/define-winner.service';
import { GenerateMatchScoreService } from '../../shared/services/generate-match-score.service';
import { ChampionshipModel } from '../model/championship.model';
import { Round16Output } from '../model/round-16.output';
import { ChampionshipRepositoryProvider } from '../repository/championship-repository.provider';

export class Round16ResultUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>,
    private bracketRepository: BracketRepositoryProvider<BracketModel>,
    private defineWinnerService: DefineWinnerService,
    private generateMatchScoreService: GenerateMatchScoreService
  ) { }

  public execute = async (input: string): Promise<Round16Output> => {

    const championship = await this.championshipRepository.getById(input)

    if (!championship) throw new NotFoundException('Championship not found')

    const round16 = await this.bracketRepository.getChampionship(championship.id, Round.ROUND_OF_16)

    if (round16.find(item => item.realized)) throw new ForbiddenException('Round of 16 already classified')

    for (const bracket of round16) {

      const { teamAscore, teamBscore } = await this.generateMatchScoreService.getMatchScores()

      bracket.team_a_points = teamAscore
      bracket.team_b_points = teamBscore
      bracket.realized = true

      await this.bracketRepository.update(bracket, bracket.id)
    }

    for (let i = 0; i < round16.length; i += 2) {

      const firstBracket = round16[i]
      const secondBracket = round16[i + 1]

      const teamA = await this.defineWinnerService.ofTheMatch(championship.id as string, firstBracket)
      const teamB = await this.defineWinnerService.ofTheMatch(championship.id as string, secondBracket)

      const obj: BracketModel = {
        round: Round.QUARTER_FINAL,
        championship,
        team_a: teamA,
        team_b: teamB,
        realized: false
      }

      await this.bracketRepository.save(obj)
    }

    const quarter_final = await this.bracketRepository.getChampionship(championship.id, Round.QUARTER_FINAL)

    const round16Output: Round16Output = {
      round16,
      quarter_final
    }

    return round16Output

  }

}