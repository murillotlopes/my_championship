import { Repository } from '../../shared/ports/repository';
import { UseCase } from '../../shared/ports/usecase';
import { TeamModel } from '../model/team.model';


export class CreateTeamUseCase implements UseCase {

  constructor(
    private teamRepository: Repository<TeamModel>
  ) { }

  public execute = async (input: TeamModel) => {

    return this.teamRepository.save(input)

  }

}