import { Request } from 'express';
import { TeamModel } from '../../../../../core/team/model/team.model';
import { CreateTeamUseCase } from '../../../../../core/team/usecases/create-team.usecase';
import TeamRepositoryInMemory from '../../../../database/in-memory/team-repository.in-memory';
import { Controller } from '../../shared/controller';
import { CreateTeamDto } from '../dtos/create-team.dto';

class CreateTeamController extends Controller {

  constructor(
    private readonly createTeamUseCase: CreateTeamUseCase,
    protected readonly dto?: any
  ) {
    super(dto)
  }


  protected execute(req: Request): Promise<TeamModel> {

    const { body } = req

    return this.createTeamUseCase.execute(body)
  }

}

const teamRepositoryInMemory = new TeamRepositoryInMemory()
const createTeamUseCase = new CreateTeamUseCase(teamRepositoryInMemory)

export default new CreateTeamController(createTeamUseCase, CreateTeamDto)