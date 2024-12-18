import { NotFoundException } from '../../shared/errs/not-found-exception';
import { UseCase } from '../../shared/providers/usecase';
import { ChampionshipModel } from '../model/championship.model';
import { ChampionshipRepositoryProvider } from '../repository/championship-repository.provider';

export class RetriveOneChampionshipUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>
  ) { }


  public execute = async (input: string): Promise<ChampionshipModel> => {

    const team = await this.championshipRepository.getById(input)

    if (!team) throw new NotFoundException('Championship not found')

    return this.championshipRepository.getById(input)

  }


}