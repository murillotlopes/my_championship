import { Request } from 'express';
import { ChampionshipModel } from '../../../../../core/championship/model/championship.model';
import { CreateChampionshipUseCase } from '../../../../../core/championship/usecases/create-championshipt.usecase';
import { ChampionshipRepositoryTypeORM } from '../../../../database/typeorm/repositories/championship-repository.typeorm';
import { Controller } from '../../shared/controller';
import { CreateChampionshipDto } from '../dtos/create-championship.dto';

class CreateChampionshipController extends Controller {

  constructor(
    private readonly createChampionshipUseCase: CreateChampionshipUseCase,
    protected readonly dto?: any
  ) {
    super(dto);
  }

  protected execute = async (req: Request): Promise<ChampionshipModel> => {

    const { body } = req

    return this.createChampionshipUseCase.execute(body)
  }

}

const championshipRepository = new ChampionshipRepositoryTypeORM()
const createChampionshipUseCase = new CreateChampionshipUseCase(championshipRepository)

export default new CreateChampionshipController(createChampionshipUseCase, CreateChampionshipDto)