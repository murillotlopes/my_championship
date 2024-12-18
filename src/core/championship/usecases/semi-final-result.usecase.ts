import { BracketModel } from '../../bracket/model/bracket.model'
import { Round } from '../../bracket/model/round.enum'
import { BracketRepositoryProvider } from '../../bracket/repository/bracket-repository.provider'
import { ForbiddenException } from '../../shared/errs/forbidden-exception'
import { NotFoundException } from '../../shared/errs/not-found-exception'
import { UseCase } from '../../shared/providers/usecase'
import { DefineWinnerService } from '../../shared/services/define-winner.service'
import { GenerateMatchScoreService } from '../../shared/services/generate-match-score.service'
import { ShuffleArray } from '../../shared/services/shuffle-array.service'
import { TeamModel } from '../../team/model/team.model'
import { ChampionshipModel } from '../model/championship.model'
import { SemiFinalOutput } from '../model/semi-final.output'
import { ChampionshipRepositoryProvider } from '../repository/championship-repository.provider'


export class SemiFinalResultUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>,
    private bracketRepository: BracketRepositoryProvider<BracketModel>,
    private defineWinnerService: DefineWinnerService,
    private generateMatchScoreService: GenerateMatchScoreService,
    private shuffleArray: ShuffleArray
  ) { }

  public execute = async (input: string): Promise<SemiFinalOutput> => {

    const championship = await this.championshipRepository.getById(input)

    if (!championship) throw new NotFoundException('Championship not found')

    const semi_final = await this.bracketRepository.getChampionship(championship.id, Round.SEMI_FINAL)

    if (semi_final.find(item => item.realized)) throw new ForbiddenException('Semi final already classified')

    for (const bracket of semi_final) {

      const { teamAscore, teamBscore } = await this.generateMatchScoreService.getMatchScores()

      bracket.team_a_points = teamAscore
      bracket.team_b_points = teamBscore
      bracket.realized = true

      await this.bracketRepository.update(bracket, bracket.id)
    }

    const semiFinalWinners: TeamModel[] = []
    const semiFinalLoser: TeamModel[] = []

    for (const match of semi_final) {

      const winner = await this.defineWinnerService.ofTheMatch(championship.id as string, match)
      const loser = match.team_a.id === winner.id ? match.team_b : match.team_a

      semiFinalWinners.push(winner)
      semiFinalLoser.push(loser)

    }

    const shuffledWinners = this.shuffleArray.shuffle(semiFinalWinners)
    const shuffledLoser = this.shuffleArray.shuffle(semiFinalLoser)

    for (let i = 0; i < shuffledWinners.length; i += 2) {

      const matchFinal: BracketModel = {
        round: Round.FINAL,
        championship,
        team_a: shuffledWinners[i],
        team_b: shuffledWinners[i + 1],
        realized: false
      }

      await this.bracketRepository.save(matchFinal)

      const matchPlayoff: BracketModel = {
        round: Round.THIRD_PLACE_PLAYOFF,
        championship,
        team_a: shuffledLoser[i],
        team_b: shuffledLoser[i + 1],
        realized: false
      }

      await this.bracketRepository.save(matchPlayoff)

    }

    const third_place_playoff = await this.bracketRepository.getChampionship(championship.id, Round.THIRD_PLACE_PLAYOFF)
    const final = await this.bracketRepository.getChampionship(championship.id, Round.FINAL)

    const semiFinalOutput: SemiFinalOutput = {
      semi_final,
      final: final[0],
      third_place_playoff: third_place_playoff[0]
    }

    return semiFinalOutput

  }

}