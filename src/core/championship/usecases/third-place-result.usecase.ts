import { BracketModel } from '../../bracket/model/bracket.model';
import { Round } from '../../bracket/model/round.enum';
import { BracketRepositoryPort } from '../../bracket/repository/bracket-repository.port';
import { UseCase } from '../../shared/ports/usecase';
import { GenerateMatchScoreService } from '../../shared/services/generate-match-score.service';
import { ChampionshipModel } from '../model/championship.model';
import { ThirdPlaceOutput } from '../model/third-place.output';
import { ChampionshipRepositoryPort } from '../repository/championship-repository.port';

export class ThirdPlaceResultUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryPort<ChampionshipModel>,
    private bracketRepository: BracketRepositoryPort<BracketModel>,
    private generateMatchScoreService: GenerateMatchScoreService
  ) { }

  public execute = async (input: string): Promise<ThirdPlaceOutput> => {

    const championship = await this.championshipRepository.getById(input)

    if (!championship) throw new Error('Championship not found')

    const third_place_playoff = await this.bracketRepository.getChampionship(championship.id, Round.THIRD_PLACE_PLAYOFF)

    if (third_place_playoff.find(item => item.team_a_points)) throw new Error('Third Place Playoff already classified')

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