import { Request } from 'express';
import { TeamModel } from '../../../../../core/team/model/team.model';
import { DeleteTeamUseCase } from '../../../../../core/team/usecases/delete-team.usecase';
import { BracketRepositoryTypeORM } from '../../../../database/typeorm/repositories/bracket-repository.typeorm';
import { TeamRepositoryTypeORM } from '../../../../database/typeorm/repositories/team-repository.typeorm';
import { Controller } from '../../shared/controller';

class DeleteTeamController extends Controller {

  constructor(
    private readonly deleteTeamUseCase: DeleteTeamUseCase,
  ) {
    super()
  }

  protected execute(req: Request): Promise<TeamModel> {

    const teamId = req.params.teamId

    return this.deleteTeamUseCase.execute(teamId)
  }

}

const teamRepository = new TeamRepositoryTypeORM()
const bracketRepository = new BracketRepositoryTypeORM()
const deleteTeamUseCase = new DeleteTeamUseCase(teamRepository, bracketRepository)

export default new DeleteTeamController(deleteTeamUseCase)