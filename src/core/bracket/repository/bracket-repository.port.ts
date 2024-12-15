import { Repository } from '../../shared/ports/repository';
import { Round } from '../model/round.enum';

export interface BracketReposoritoryPort<M> extends Repository<M> {

  getChampionship(championshipId: unknown, round?: Round): Promise<M[]>

}