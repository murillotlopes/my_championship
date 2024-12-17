import { BracketModel } from '../../bracket/model/bracket.model';
import { Round } from '../../bracket/model/round.enum';
import { BracketRepositoryProvider } from '../../bracket/repository/bracket-repository.provider';
import { UseCase } from '../../shared/providers/usecase';
import { GenerateMatchScoreService } from '../../shared/services/generate-match-score.service';
import { ChampionshipModel } from '../model/championship.model';
import { FinalOutput } from '../model/final.output';
import { ChampionshipRepositoryProvider } from '../repository/championship-repository.provider';

export class FinalResultUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>,
    private bracketRepository: BracketRepositoryProvider<BracketModel>,
    private generateMatchScoreService: GenerateMatchScoreService
  ) { }

  public execute = async (input: string): Promise<FinalOutput> => {

    const championship = await this.championshipRepository.getById(input)

    if (!championship) throw new Error('Championship not found')

    const finalBracket = await this.bracketRepository.getChampionship(championship.id, Round.FINAL)

    if (finalBracket.find(item => item.team_a_points)) throw new Error('Final already classified')

    const final = finalBracket[0]

    const { teamAscore, teamBscore } = await this.generateMatchScoreService.getMatchScores()

    final.team_a_points = teamAscore
    final.team_b_points = teamBscore
    final.realized = true

    await this.bracketRepository.update(final, final.id)

    const finalOutput: FinalOutput = {
      final
    }

    return finalOutput

  }

}