import { UseCase } from '../../shared/providers/usecase';
import { ChampionshipModel } from '../model/championship.model';
import { ChampionshipRepositoryProvider } from '../repository/championship-repository.provider';

export class RetriveChampionshipUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>
  ) { }


  public execute = async (): Promise<ChampionshipModel[]> => {

    return this.championshipRepository.getList()

  }


}