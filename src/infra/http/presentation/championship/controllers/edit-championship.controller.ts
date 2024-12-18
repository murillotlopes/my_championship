import { Request } from 'express';
import { ChampionshipModel } from '../../../../../core/championship/model/championship.model';
import { ChampionshipRepositoryTypeORM } from '../../../../database/typeorm/repositories/championship-repository.typeorm';
import { Controller } from '../../shared/controller';
import { EditChampionshipDto } from '../dtos/edit-championship.dto';
import { EditChampionshipUseCase } from './../../../../../core/championship/usecases/edit-championship.usecase';

class EditChampionshipController extends Controller {

  constructor(
    private readonly editChampionshipUseCase: EditChampionshipUseCase,
    protected readonly dto: any
  ) {
    super(dto)
  }


  protected execute = async (req: Request): Promise<ChampionshipModel> => {

    const championshipId = req.params.championshipId
    const body = req.body

    body.id = championshipId

    return this.editChampionshipUseCase.execute(body)

  }

}

const championshipRepository = new ChampionshipRepositoryTypeORM()
const editChampionshipUseCase = new EditChampionshipUseCase(championshipRepository)

export default new EditChampionshipController(editChampionshipUseCase, EditChampionshipDto)