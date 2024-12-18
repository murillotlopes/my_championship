import { Request } from 'express';
import { ChampionshipModel } from '../../../../../core/championship/model/championship.model';
import { RetriveOneChampionshipUseCase } from '../../../../../core/championship/usecases/retrive-one-championship.usecase';
import { ChampionshipRepositoryTypeORM } from '../../../../database/typeorm/repositories/championship-repository.typeorm';
import { Controller } from '../../shared/controller';

class RetriveOneChampionshipController extends Controller {

  constructor(
    private readonly editChampionshipUseCase: RetriveOneChampionshipUseCase,
  ) {
    super()
  }

  protected execute = async (req: Request): Promise<ChampionshipModel> => {

    const championshipId = req.params.championshipId

    return this.editChampionshipUseCase.execute(championshipId)

  }

}

const championshipRepository = new ChampionshipRepositoryTypeORM()
const editChampionshipUseCase = new RetriveOneChampionshipUseCase(championshipRepository)

export default new RetriveOneChampionshipController(editChampionshipUseCase)