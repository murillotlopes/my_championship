import { Request } from 'express';
import { TeamModel } from '../../../../../core/team/model/team.model';
import { RetriveTeamUseCase } from '../../../../../core/team/usecases/retrive-team.usecase';
import { TeamRepositoryTypeORM } from '../../../../database/typeorm/repositories/team-repository.typeorm';
import { Controller } from '../../shared/controller';

class RetriveTeamController extends Controller {

  constructor(
    private readonly retriveTeamUseCase: RetriveTeamUseCase,
  ) {
    super()
  }

  protected execute(req: Request): Promise<TeamModel[]> {

    return this.retriveTeamUseCase.execute()
  }

}

const teamRepository = new TeamRepositoryTypeORM()
const retriveTeamUseCase = new RetriveTeamUseCase(teamRepository)

export default new RetriveTeamController(retriveTeamUseCase)