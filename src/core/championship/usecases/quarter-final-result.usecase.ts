import { BracketModel } from '../../bracket/model/bracket.model';
import { Round } from '../../bracket/model/round.enum';
import { BracketRepositoryProvider } from '../../bracket/repository/bracket-repository.provider';
import { UseCase } from '../../shared/providers/usecase';
import { DefineWinnerService } from '../../shared/services/define-winner.service';
import { GenerateMatchScoreService } from '../../shared/services/generate-match-score.service';
import { ChampionshipModel } from '../model/championship.model';
import { QuarterFinalOutput } from '../model/quarter-final.output';
import { ChampionshipRepositoryProvider } from '../repository/championship-repository.provider';

export class QuarterFinalResultUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>,
    private bracketRepository: BracketRepositoryProvider<BracketModel>,
    private defineWinnerService: DefineWinnerService,
    private generateMatchScoreService: GenerateMatchScoreService
  ) { }

  public execute = async (input: string): Promise<QuarterFinalOutput> => {

    const championship = await this.championshipRepository.getById(input)

    if (!championship) throw new Error('Championship not found')

    const quarter_final = await this.bracketRepository.getChampionship(championship.id, Round.QUARTER_FINAL)

    if (quarter_final.find(item => item.team_a_points)) throw new Error('Quarter final already classified')

    for (const bracket of quarter_final) {

      const { teamAscore, teamBscore } = await this.generateMatchScoreService.getMatchScores()

      bracket.team_a_points = teamAscore
      bracket.team_b_points = teamBscore

      await this.bracketRepository.update(bracket, bracket.id)
    }

    for (let i = 0; i < quarter_final.length; i += 2) {

      const firstBracket = quarter_final[i]
      const secondBracket = quarter_final[i + 1]

      const teamA = await this.defineWinnerService.ofTheMatch(championship.id as string, firstBracket)
      const teamB = await this.defineWinnerService.ofTheMatch(championship.id as string, secondBracket)

      const obj: BracketModel = {
        round: Round.SEMI_FINAL,
        championship,
        team_a: teamA,
        team_b: teamB
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