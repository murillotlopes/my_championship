import { Request } from 'express';
import { SemiFinalOutput } from '../../../../../core/championship/model/semi-final.output';
import { SemiFinalResultUseCase } from '../../../../../core/championship/usecases/semi-final-result.usecase';
import { DefineWinnerService } from '../../../../../core/shared/services/define-winner.service';
import { GenerateMatchScoreService } from '../../../../../core/shared/services/generate-match-score.service';
import { BracketRepositoryInMemory } from '../../../../database/in-memory/bracket-repository.in-memory';
import { ChampionshipRepositoryInMemory } from '../../../../database/in-memory/championship-repository.in-memory';
import { Controller } from '../../shared/controller';

class SemiFinalResultController extends Controller {

  constructor(
    private readonly semiFinalResultUseCase: SemiFinalResultUseCase
  ) {
    super()
  }

  protected execute = async (req: Request): Promise<SemiFinalOutput> => {

    const championshipId = req.params.championshipId

    return this.semiFinalResultUseCase.execute(championshipId)

  }

}

const championshipRepository = new ChampionshipRepositoryInMemory()
const bracketRepository = new BracketRepositoryInMemory()
const defineWinnerService = new DefineWinnerService(bracketRepository)
const generateMatchScoreService = new GenerateMatchScoreService()
const semiFinalResultUseCase = new SemiFinalResultUseCase(championshipRepository, bracketRepository, defineWinnerService, generateMatchScoreService)

export default new SemiFinalResultController(semiFinalResultUseCase)