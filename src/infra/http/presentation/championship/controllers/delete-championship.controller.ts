import { Request } from 'express';
import { ChampionshipModel } from '../../../../../core/championship/model/championship.model';
import { DeleteChampionshipUseCase } from '../../../../../core/championship/usecases/delete-championship.usecase';
import { BracketRepositoryTypeORM } from '../../../../database/typeorm/repositories/bracket-repository.typeorm';
import { ChampionshipRepositoryTypeORM } from '../../../../database/typeorm/repositories/championship-repository.typeorm';
import { Controller } from '../../shared/controller';

class DeleteChampionshipController extends Controller {

  constructor(
    private readonly deleteChampionshipUseCase: DeleteChampionshipUseCase,
  ) {
    super()
  }


  protected execute = async (req: Request): Promise<ChampionshipModel> => {

    const championshipId = req.params.championshipId

    return this.deleteChampionshipUseCase.execute(championshipId)

  }

}

const championshipRepository = new ChampionshipRepositoryTypeORM()
const bracketRepository = new BracketRepositoryTypeORM()
const deleteChampionshipUseCase = new DeleteChampionshipUseCase(championshipRepository, bracketRepository)

export default new DeleteChampionshipController(deleteChampionshipUseCase)