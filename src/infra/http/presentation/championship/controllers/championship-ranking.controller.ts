import { Request } from 'express';
import { GeneralClassificationOutput } from '../../../../../core/championship/model/general-classification.output';
import { DefineWinnerService } from '../../../../../core/shared/services/define-winner.service';
import { Controller } from '../../shared/controller';
import { ChampionshipRankingUseCase } from './../../../../../core/championship/usecases/championship-ranking.usecase';
import { BracketRepositoryInMemory } from './../../../../database/in-memory/bracket-repository.in-memory';
import { ChampionshipRepositoryInMemory } from './../../../../database/in-memory/championship-repository.in-memory';

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

const championshipRepository = new ChampionshipRepositoryInMemory()
const bracketRepository = new BracketRepositoryInMemory()
const defineWinnerService = new DefineWinnerService(bracketRepository)
const championshipRankingUseCase = new ChampionshipRankingUseCase(championshipRepository, bracketRepository, defineWinnerService)

export default new ChampionshipRankingController(championshipRankingUseCase)