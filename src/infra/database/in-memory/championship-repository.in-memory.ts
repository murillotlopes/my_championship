import { ChampionshipModel } from '../../../core/championship/model/championship.model';
import { ChampionshipRepositoryPort } from '../../../core/championship/repository/championship-repository.port';
import { RepositoryInMemory } from '../shared/repository-in-memory';

export class ChampionshipRepositoryInMemory extends RepositoryInMemory<ChampionshipModel> implements ChampionshipRepositoryPort<ChampionshipModel> {

}