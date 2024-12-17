import { Request } from 'express';
import { GeneralClassificationOutput } from '../../../../../core/championship/model/general-classification.output';
import { DefineWinnerService } from '../../../../../core/shared/services/define-winner.service';
import { BracketRepositoryTypeORM } from '../../../../database/typeorm/repositories/bracket-repository.typeorm';
import { ChampionshipRepositoryTypeORM } from '../../../../database/typeorm/repositories/championship-repository.typeorm';
import { Controller } from '../../shared/controller';
import { ChampionshipRankingUseCase } from './../../../../../core/championship/usecases/championship-ranking.usecase';

class ChampionshipRankingController extends Controller {

  constructor(
    private readonly championshipRankingUseCase: ChampionshipRankingUseCase
  ) {
    super()
  }

  protected execute = async (req: Request): Promise<GeneralClassificationOutput> => {

    const championshipId = req.params.championshipId

    return this.championshipRankingUseCase.execute(championshipId)

  }

}

const championshipRepository = new ChampionshipRepositoryTypeORM()
const bracketRepository = new BracketRepositoryTypeORM()
const defineWinnerService = new DefineWinnerService(bracketRepository)
const championshipRankingUseCase = new ChampionshipRankingUseCase(championshipRepository, bracketRepository, defineWinnerService)

export default new ChampionshipRankingController(championshipRankingUseCase)