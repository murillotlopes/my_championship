import { ChampionshipModel } from '../../championship/model/championship.model';
import { BaseModel } from '../../shared/model/base.model';
import { TeamModel } from '../../team/model/team.model';
import { Round } from './round.enum';

export interface BracketModel extends BaseModel {

  round: Round
  team_a_points?: number
  team_b_points?: number
  team_a: TeamModel
  team_b: TeamModel
  championship: ChampionshipModel
  realized: boolean

}