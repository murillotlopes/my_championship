import { Repository } from '../../shared/providers/repository';
import { Round } from '../model/round.enum';

export interface BracketRepositoryProvider<M> extends Repository<M> {

  getChampionship(championshipId: unknown, round?: Round): Promise<M[]>
  score(championshipId: unknown, teamId: unknown): Promise<number>

}