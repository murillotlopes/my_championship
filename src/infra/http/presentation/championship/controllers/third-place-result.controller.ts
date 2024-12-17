import { Request } from 'express';
import { ThirdPlaceOutput } from '../../../../../core/championship/model/third-place.output';
import { ThirdPlaceResultUseCase } from '../../../../../core/championship/usecases/third-place-result.usecase';
import { GenerateMatchScoreService } from '../../../../../core/shared/services/generate-match-score.service';
import { BracketRepositoryTypeORM } from '../../../../database/typeorm/repositorys/bracket-repository.typeorm';
import { ChampionshipRepositoryTypeORM } from '../../../../database/typeorm/repositorys/championship-repository.typeorm';
import { Controller } from '../../shared/controller';

class ThirdPlaceResultController extends Controller {

  constructor(
    private readonly thirdPlaceResultUseCase: ThirdPlaceResultUseCase
  ) {
    super()
  }


  protected execute = async (req: Request): Promise<ThirdPlaceOutput> => {

    const championshipId = req.params.championshipId

    return this.thirdPlaceResultUseCase.execute(championshipId)

  }

}

const championshipRepository = new ChampionshipRepositoryTypeORM()
const bracketRepository = new BracketRepositoryTypeORM()
const generateMatchScoreService = new GenerateMatchScoreService()
const thirdPlaceResultUseCase = new ThirdPlaceResultUseCase(championshipRepository, bracketRepository, generateMatchScoreService)

export default new ThirdPlaceResultController(thirdPlaceResultUseCase)