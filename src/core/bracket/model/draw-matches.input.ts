import { ChampionshipModel } from '../../championship/model/championship.model';
import { TeamModel } from '../../team/model/team.model';

export interface DrawMatchesInput {

  teams: TeamModel[]
  championship: ChampionshipModel

}