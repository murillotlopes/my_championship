import { BracketModel } from '../../bracket/model/bracket.model';
import { Round } from '../../bracket/model/round.enum';
import { BracketRepositoryProvider } from '../../bracket/repository/bracket-repository.provider';
import { UseCase } from '../../shared/providers/usecase';
import { GenerateMatchScoreService } from '../../shared/services/generate-match-score.service';
import { ChampionshipModel } from '../model/championship.model';
import { ThirdPlaceOutput } from '../model/third-place.output';
import { ChampionshipRepositoryProvider } from '../repository/championship-repository.provider';

export class ThirdPlaceResultUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>,
    private bracketRepository: BracketRepositoryProvider<BracketModel>,
    private generateMatchScoreService: GenerateMatchScoreService
  ) { }

  public execute = async (input: string): Promise<ThirdPlaceOutput> => {

    const championship = await this.championshipRepository.getById(input)

    if (!championship) throw new Error('Championship not found')

    const third_place_playoff = await this.bracketRepository.getChampionship(championship.id, Round.THIRD_PLACE_PLAYOFF)

    if (third_place_playoff.find(item => item.realized)) throw new Error('Third Place Playoff already classified')

    const third_place = third_place_playoff[0]

    const { teamAscore, teamBscore } = await this.generateMatchScoreService.getMatchScores()

    third_place.team_a_points = teamAscore
    third_place.team_b_points = teamBscore

    await this.bracketRepository.update(third_place, third_place.id)

    const thirdPlaceOutput: ThirdPlaceOutput = {
      third_place
    }

    return thirdPlaceOutput

  }

}