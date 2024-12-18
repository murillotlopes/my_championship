import { ChampionshipModel } from './championship.model';
import { RankingOutput } from './ranking.output';

export interface GeneralClassificationOutput {

  championship: ChampionshipModel,
  ranking: RankingOutput[]

}