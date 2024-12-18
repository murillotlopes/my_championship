import { Request } from 'express';
import { TeamModel } from '../../../../../core/team/model/team.model';
import { EditTeamUseCase } from '../../../../../core/team/usecases/edit-team.usecase';
import { TeamRepositoryTypeORM } from '../../../../database/typeorm/repositories/team-repository.typeorm';
import { Controller } from '../../shared/controller';
import { EditTeamDto } from '../dtos/edit-team.dto';

class EditTeamController extends Controller {

  constructor(
    private readonly editTeamUseCase: EditTeamUseCase,
    protected readonly dto?: any
  ) {
    super(dto)
  }

  protected execute(req: Request): Promise<TeamModel> {

    const teamId = req.params.teamId
    const body = req.body

    body.id = teamId

    return this.editTeamUseCase.execute(body)
  }

}

const teamRepository = new TeamRepositoryTypeORM()
const createTeamUseCase = new EditTeamUseCase(teamRepository)

export default new EditTeamController(createTeamUseCase, EditTeamDto)