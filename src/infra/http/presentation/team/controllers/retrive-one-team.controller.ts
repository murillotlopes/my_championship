import { Request } from 'express';
import { TeamModel } from '../../../../../core/team/model/team.model';
import { RetriveOneTeamUseCase } from '../../../../../core/team/usecases/retrive-one-team.usecase';
import { TeamRepositoryTypeORM } from '../../../../database/typeorm/repositories/team-repository.typeorm';
import { Controller } from '../../shared/controller';

class RetriveOneTeamController extends Controller {

  constructor(
    private readonly retriveOneTeamUseCase: RetriveOneTeamUseCase,
  ) {
    super()
  }

  protected execute(req: Request): Promise<TeamModel> {

    const teamId = req.params.teamId

    return this.retriveOneTeamUseCase.execute(teamId)
  }

}

const teamRepository = new TeamRepositoryTypeORM()
const retriveOneTeamUseCase = new RetriveOneTeamUseCase(teamRepository)

export default new RetriveOneTeamController(retriveOneTeamUseCase)