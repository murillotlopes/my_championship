import { IsNotEmpty, IsString } from 'class-validator';
import { TeamModel } from '../../../../../core/team/model/team.model';

export class CreateTeamDto implements TeamModel {

  @IsString()
  @IsNotEmpty()
  name!: string

}