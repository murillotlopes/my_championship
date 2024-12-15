import { Request } from 'express';
import { QuarterFinalOutput } from '../../../../../core/championship/model/quarter-final.output';
import { QuarterFinalResultUseCase } from '../../../../../core/championship/usecases/quarter-final-result.usecase';
import { DefineWinnerService } from '../../../../../core/shared/services/define-winner.service';
import { GenerateMatchScoreService } from '../../../../../core/shared/services/generate-match-score.service';
import { BracketRepositoryInMemory } from '../../../../database/in-memory/bracket-repository.in-memory';
import { ChampionshipRepositoryInMemory } from '../../../../database/in-memory/championship-repository.in-memory';
import { Controller } from '../../shared/controller';

class QuarterFinalResultController extends Controller {

  constructor(
    private readonly quarterFinalResultUseCase: QuarterFinalResultUseCase
  ) {
    super()
  }

  protected execute = async (req: Request): Promise<QuarterFinalOutput> => {

    const championshipId = req.params.championshipId

    return this.quarterFinalResultUseCase.execute(championshipId)


  }

}

const championshipRepository = new ChampionshipRepositoryInMemory()
const bracketRepository = new BracketRepositoryInMemory()
const defineWinnerService = new DefineWinnerService(bracketRepository)
const generateMatchScoreService = new GenerateMatchScoreService()
const quarterFinalResultUseCase = new QuarterFinalResultUseCase(championshipRepository, bracketRepository, defineWinnerService, generateMatchScoreService)

export default new QuarterFinalResultController(quarterFinalResultUseCase)