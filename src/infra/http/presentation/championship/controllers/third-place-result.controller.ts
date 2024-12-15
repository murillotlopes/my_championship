import { Request } from 'express';
import { ThirdPlaceResultUseCase } from '../../../../../core/championship/usecases/third-place-result.usecase';
import { GenerateMatchScoreService } from '../../../../../core/shared/services/generate-match-score.service';
import { BracketRepositoryInMemory } from '../../../../database/in-memory/bracket-repository.in-memory';
import { ChampionshipRepositoryInMemory } from '../../../../database/in-memory/championship-repository.in-memory';
import { Controller } from '../../shared/controller';

class ThirdPlaceResultController extends Controller {

  constructor(
    private readonly thirdPlaceResultUseCase: ThirdPlaceResultUseCase
  ) {
    super()
  }


  protected execute = async (req: Request): Promise<unknown> => {

    const championshipId = req.params.championshipId

    return this.thirdPlaceResultUseCase.execute(championshipId)

  }

}

const championshipRepository = new ChampionshipRepositoryInMemory()
const bracketRepository = new BracketRepositoryInMemory()
const generateMatchScoreService = new GenerateMatchScoreService()
const thirdPlaceResultUseCase = new ThirdPlaceResultUseCase(championshipRepository, bracketRepository, generateMatchScoreService)

export default new ThirdPlaceResultController(thirdPlaceResultUseCase)