import { BracketModel } from '../../bracket/model/bracket.model'
import { Round } from '../../bracket/model/round.enum'
import { BracketRepositoryProvider } from '../../bracket/repository/bracket-repository.provider'
import { UseCase } from '../../shared/providers/usecase'
import { DefineWinnerService } from '../../shared/services/define-winner.service'
import { GenerateMatchScoreService } from '../../shared/services/generate-match-score.service'
import { ChampionshipModel } from '../model/championship.model'
import { SemiFinalOutput } from '../model/semi-final.output'
import { ChampionshipRepositoryProvider } from '../repository/championship-repository.provider'


export class SemiFinalResultUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>,
    private bracketRepository: BracketRepositoryProvider<BracketModel>,
    private defineWinnerService: DefineWinnerService,
    private generateMatchScoreService: GenerateMatchScoreService
  ) { }

  public execute = async (input: string): Promise<SemiFinalOutput> => {

    const championship = await this.championshipRepository.getById(input)

    if (!championship) throw new Error('Championship not found')

    const semi_final = await this.bracketRepository.getChampionship(championship.id, Round.SEMI_FINAL)

    if (semi_final.find(item => item.team_a_points)) throw new Error('Quarter final already classified')

    for (const bracket of semi_final) {

      const { teamAscore, teamBscore } = await this.generateMatchScoreService.getMatchScores()

      bracket.team_a_points = teamAscore
      bracket.team_b_points = teamBscore

      await this.bracketRepository.update(bracket, bracket.id)
    }

    for (let i = 0; i < semi_final.length; i += 2) {

      const firstBracket = semi_final[i]
      const secondBracket = semi_final[i + 1]

      const teamA = await this.defineWinnerService.ofTheMatch(championship.id as string, firstBracket)
      const teamB = await this.defineWinnerService.ofTheMatch(championship.id as string, secondBracket)

      const obj: BracketModel = {
        round: Round.FINAL,
        championship,
        team_a: teamA,
        team_b: teamB
      }

      await this.bracketRepository.save(obj)

      const firstLoser = firstBracket.team_a.id === teamA.id ? firstBracket.team_b : firstBracket.team_a
      const secundLoser = secondBracket.team_a.id === teamB.id ? secondBracket.team_b : firstBracket.team_a

      const objPlayoff: BracketModel = {
        round: Round.THIRD_PLACE_PLAYOFF,
        championship,
        team_a: firstLoser,
        team_b: secundLoser
      }

      await this.bracketRepository.save(objPlayoff)
    }

    const third_place_playoff = await this.bracketRepository.getChampionship(championship.id, Round.FINAL)
    const final = await this.bracketRepository.getChampionship(championship.id, Round.FINAL)

    const semiFinalOutput: SemiFinalOutput = {
      final: final[0],
      third_place_playoff: third_place_playoff[0]
    }

    return semiFinalOutput

  }

}