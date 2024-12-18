import { Request } from 'express';
import { Round16Output } from '../../../../../core/championship/model/round-16.output';
import { DefineWinnerService } from '../../../../../core/shared/services/define-winner.service';
import { GenerateMatchScoreService } from '../../../../../core/shared/services/generate-match-score.service';
import { BracketRepositoryTypeORM } from '../../../../database/typeorm/repositories/bracket-repository.typeorm';
import { ChampionshipRepositoryTypeORM } from '../../../../database/typeorm/repositories/championship-repository.typeorm';
import { Controller } from '../../shared/controller';
import { Round16ResultUseCase } from './../../../../../core/championship/usecases/round-16-result.usecase';

class Round16ResultController extends Controller {

  constructor(
    private readonly round16ResultUseCase: Round16ResultUseCase
  ) {
    super()
  }

  protected execute = async (req: Request): Promise<Round16Output> => {

    const championshipId = req.params.championshipId

    return this.round16ResultUseCase.execute(championshipId)

  }

}

const championshipRepository = new ChampionshipRepositoryTypeORM()
const bracketRepository = new BracketRepositoryTypeORM()
const defineWinnerService = new DefineWinnerService(bracketRepository)
const generateMatchScoreService = new GenerateMatchScoreService()
const round16ResultUseCase = new Round16ResultUseCase(championshipRepository, bracketRepository, defineWinnerService, generateMatchScoreService)

export default new Round16ResultController(round16ResultUseCase)
