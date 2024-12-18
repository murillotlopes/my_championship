import { Request } from 'express';
import { QuarterFinalOutput } from '../../../../../core/championship/model/quarter-final.output';
import { QuarterFinalResultUseCase } from '../../../../../core/championship/usecases/quarter-final-result.usecase';
import { DefineWinnerService } from '../../../../../core/shared/services/define-winner.service';
import { GenerateMatchScoreService } from '../../../../../core/shared/services/generate-match-score.service';
import { ShuffleArray } from '../../../../../core/shared/services/shuffle-array.service';
import { BracketRepositoryTypeORM } from '../../../../database/typeorm/repositories/bracket-repository.typeorm';
import { ChampionshipRepositoryTypeORM } from '../../../../database/typeorm/repositories/championship-repository.typeorm';
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

const championshipRepository = new ChampionshipRepositoryTypeORM()
const bracketRepository = new BracketRepositoryTypeORM()
const defineWinnerService = new DefineWinnerService(bracketRepository)
const generateMatchScoreService = new GenerateMatchScoreService()
const shuffleArray = new ShuffleArray()
const quarterFinalResultUseCase = new QuarterFinalResultUseCase(championshipRepository, bracketRepository, defineWinnerService, generateMatchScoreService, shuffleArray)

export default new QuarterFinalResultController(quarterFinalResultUseCase)