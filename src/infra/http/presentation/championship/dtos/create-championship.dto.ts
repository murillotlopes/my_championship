import { IsNotEmpty, IsString } from 'class-validator';
import { ChampionshipModel } from '../../../../../core/championship/model/championship.model';

export class CreateChampionshipDto implements ChampionshipModel {

  @IsString()
  @IsNotEmpty()
  name!: string

}
