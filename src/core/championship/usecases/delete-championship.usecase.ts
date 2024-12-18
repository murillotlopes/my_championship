import { BracketModel } from '../../bracket/model/bracket.model';
import { BracketRepositoryProvider } from '../../bracket/repository/bracket-repository.provider';
import { ForbiddenException } from '../../shared/errs/forbidden-exception';
import { NotFoundException } from '../../shared/errs/not-found-exception';
import { UseCase } from '../../shared/providers/usecase';
import { ChampionshipModel } from '../model/championship.model';
import { ChampionshipRepositoryProvider } from './../repository/championship-repository.provider';

export class DeleteChampionshipUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>,
    private bracketRepository: BracketRepositoryProvider<BracketModel>
  ) { }

  public execute = async (input: string): Promise<ChampionshipModel> => {

    const championship = await this.championshipRepository.getById(input)

    if (!championship) throw new NotFoundException('Championship not found')

    const championshipList = await this.bracketRepository.getChampionship(input)

    if (championshipList.length) throw new ForbiddenException('The championship has registered matches and cannot be deleted')

    return this.championshipRepository.delete(input)

  }

}