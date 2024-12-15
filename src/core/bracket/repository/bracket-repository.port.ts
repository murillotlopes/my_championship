import { Repository } from '../../shared/ports/repository';
import { Round } from '../model/round.enum';

export interface BracketRepositoryPort<M> extends Repository<M> {

  getChampionship(championshipId: unknown, round?: Round): Promise<M[]>
  score(championshipId: unknown, teamId: unknown): Promise<number>

}