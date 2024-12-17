import { Request } from 'express';
import { FinalOutput } from '../../../../../core/championship/model/final.output';
import { FinalResultUseCase } from '../../../../../core/championship/usecases/final-result.usecase';
import { GenerateMatchScoreService } from '../../../../../core/shared/services/generate-match-score.service';
import { BracketRepositoryTypeORM } from '../../../../database/typeorm/repositorys/bracket-repository.typeorm';
import { ChampionshipRepositoryTypeORM } from '../../../../database/typeorm/repositorys/championship-repository.typeorm';
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

const championshipRepository = new ChampionshipRepositoryTypeORM()
const bracketRepository = new BracketRepositoryTypeORM()
const generateMatchScoreService = new GenerateMatchScoreService()
const finalResultUseCase = new FinalResultUseCase(championshipRepository, bracketRepository, generateMatchScoreService)

export default new FinalResultController(finalResultUseCase)