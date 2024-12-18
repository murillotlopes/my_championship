import { IsNotEmpty, IsString } from 'class-validator';
import { TeamModel } from '../../../../../core/team/model/team.model';

export class EditTeamDto implements TeamModel {

  @IsString()
  @IsNotEmpty()
  name!: string

}