import { UseCase } from '../../shared/providers/usecase';
import { ChampionshipModel } from '../model/championship.model';
import { ChampionshipRepositoryProvider } from './../repository/championship-repository.provider';

export class EditChampionshipUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>
  ) { }

  public execute = async (input: ChampionshipModel): Promise<ChampionshipModel> => {

    const championship = await this.championshipRepository.getById(input.id)

    if (!championship) throw new Error('Resource not found')

    return this.championshipRepository.update(input, input.id as string)

  }

}