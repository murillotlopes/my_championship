import { ChampionshipModel } from '../../../core/championship/model/championship.model';
import { ChampionshipRepositoryProvider } from '../../../core/championship/repository/championship-repository.provider';
import { RepositoryInMemory } from './shared/repository-in-memory';

export class ChampionshipRepositoryInMemory extends RepositoryInMemory<ChampionshipModel> implements ChampionshipRepositoryProvider<ChampionshipModel> {

}