import { Request } from 'express';
import { FinalOutput } from '../../../../../core/championship/model/final.output';
import { FinalResultUseCase } from '../../../../../core/championship/usecases/final-result.usecase';
import { GenerateMatchScoreService } from '../../../../../core/shared/services/generate-match-score.service';
import { BracketRepositoryInMemory } from '../../../../database/in-memory/bracket-repository.in-memory';
import { ChampionshipRepositoryInMemory } from '../../../../database/in-memory/championship-repository.in-memory';
import { Controller } from '../../shared/controller';

class FinalResultController extends Controller {

  constructor(
    private readonly finalResultUseCase: FinalResultUseCase
  ) {
    super()
  }


  protected execute = async (req: Request): Promise<FinalOutput> => {

    const championshipId = req.params.championshipId

    return this.finalResultUseCase.execute(championshipId)

  }

}

const championshipRepository = new ChampionshipRepositoryInMemory()
const bracketRepository = new BracketRepositoryInMemory()
const generateMatchScoreService = new GenerateMatchScoreService()
const finalResultUseCase = new FinalResultUseCase(championshipRepository, bracketRepository, generateMatchScoreService)

export default new FinalResultController(finalResultUseCase)