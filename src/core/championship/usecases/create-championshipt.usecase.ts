import { UseCase } from '../../shared/providers/usecase';
import { ChampionshipModel } from '../model/championship.model';
import { ChampionshipRepositoryProvider } from '../repository/championship-repository.provider';

export class CreateChampionshipUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>
  ) { }

  public execute = async (input: ChampionshipModel) => {

    return this.championshipRepository.save(input)

  }

}