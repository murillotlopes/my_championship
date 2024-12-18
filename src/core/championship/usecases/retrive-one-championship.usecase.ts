import { UseCase } from '../../shared/providers/usecase';
import { ChampionshipModel } from '../model/championship.model';
import { ChampionshipRepositoryProvider } from '../repository/championship-repository.provider';

export class RetriveOneChampionshipUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>
  ) { }


  public execute = async (input: string): Promise<ChampionshipModel> => {

    return this.championshipRepository.getById(input)

  }


}