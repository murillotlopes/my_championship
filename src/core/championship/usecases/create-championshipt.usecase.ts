import { Repository } from '../../shared/ports/repository';
import { UseCase } from '../../shared/ports/usecase';
import { ChampionshipModel } from '../model/championship.model';

export class CreateChampionshipUseCase implements UseCase {

  constructor(
    private championshipRepository: Repository<ChampionshipModel>
  ) { }

  public execute = async (input: ChampionshipModel) => {

    return this.championshipRepository.save(input)

  }

}