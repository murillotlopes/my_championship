import { Request } from 'express';
import { SemiFinalOutput } from '../../../../../core/championship/model/semi-final.output';
import { SemiFinalResultUseCase } from '../../../../../core/championship/usecases/semi-final-result.usecase';
import { DefineWinnerService } from '../../../../../core/shared/services/define-winner.service';
import { GenerateMatchScoreService } from '../../../../../core/shared/services/generate-match-score.service';
import { ShuffleArray } from '../../../../../core/shared/services/shuffle-array.service';
import { BracketRepositoryTypeORM } from '../../../../database/typeorm/repositorys/bracket-repository.typeorm';
import { ChampionshipRepositoryTypeORM } from '../../../../database/typeorm/repositorys/championship-repository.typeorm';
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

const championshipRepository = new ChampionshipRepositoryTypeORM()
const bracketRepository = new BracketRepositoryTypeORM()
const defineWinnerService = new DefineWinnerService(bracketRepository)
const generateMatchScoreService = new GenerateMatchScoreService()
const shuffleArray = new ShuffleArray()
const semiFinalResultUseCase = new SemiFinalResultUseCase(championshipRepository, bracketRepository, defineWinnerService, generateMatchScoreService, shuffleArray)

export default new SemiFinalResultController(semiFinalResultUseCase)