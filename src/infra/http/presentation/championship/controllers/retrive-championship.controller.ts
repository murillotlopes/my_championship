import { Request } from 'express';
import { ChampionshipModel } from '../../../../../core/championship/model/championship.model';
import { RetriveChampionshipUseCase } from '../../../../../core/championship/usecases/retrive-championship.usecase';
import { ChampionshipRepositoryTypeORM } from '../../../../database/typeorm/repositories/championship-repository.typeorm';
import { Controller } from '../../shared/controller';

class RetriveChampionshipController extends Controller {

  constructor(
    private readonly retriveChampionshipUseCase: RetriveChampionshipUseCase,
  ) {
    super()
  }

  protected execute = async (req: Request): Promise<ChampionshipModel[]> => {

    return this.retriveChampionshipUseCase.execute()

  }

}

const championshipRepository = new ChampionshipRepositoryTypeORM()
const retriveChampionshipUseCase = new RetriveChampionshipUseCase(championshipRepository)

export default new RetriveChampionshipController(retriveChampionshipUseCase)