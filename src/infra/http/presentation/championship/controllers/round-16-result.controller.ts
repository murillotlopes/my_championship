import { Request } from 'express';
import { ChampionshipModel } from '../../../../../core/championship/model/championship.model';
import { Round16Output } from '../../../../../core/championship/model/round-16.output';
import { DefineWinnerService } from '../../../../../core/shared/services/define-winner.service';
import { GenerateMatchScoreService } from '../../../../../core/shared/services/generate-match-score.service';
import { BracketRepositoryInMemory } from '../../../../database/in-memory/bracket-repository.in-memory';
import { ChampionshipRepositoryInMemory } from '../../../../database/in-memory/championship-repository.in-memory';
import { Controller } from '../../shared/controller';
import { ChampionshipRepositoryPort } from './../../../../../core/championship/repository/championship-repository.port';
import { Round16ResultUseCase } from './../../../../../core/championship/usecases/round-16-result.usecase';

class Round16ResultController extends Controller {

  constructor(
    private readonly round16ResultUseCase: Round16ResultUseCase,
    private readonly championshipRepository: ChampionshipRepositoryPort<ChampionshipModel>
  ) {
    super()
  }

  protected execute = async (req: Request): Promise<Round16Output> => {

    const championshipId = req.params.championshipId
    const championship = await this.championshipRepository.getById(championshipId)

    return this.round16ResultUseCase.execute(championshipId)

  }

}

const championshipRepository = new ChampionshipRepositoryInMemory()
const bracketRepository = new BracketRepositoryInMemory()
const defineWinnerService = new DefineWinnerService(bracketRepository)
const generateMatchScoreService = new GenerateMatchScoreService()
const round16ResultUseCase = new Round16ResultUseCase(championshipRepository, bracketRepository, defineWinnerService, generateMatchScoreService)

export default new Round16ResultController(round16ResultUseCase, championshipRepository)
