import { Request } from 'express';
import { DrawMatchesInput } from '../../../../../core/bracket/model/draw-matches.input';
import { ShuffleArray } from '../../../../../core/shared/services/shuffle-array.service';
import { BracketRepositoryTypeORM } from '../../../../database/typeorm/repositories/bracket-repository.typeorm';
import { ChampionshipRepositoryTypeORM } from '../../../../database/typeorm/repositories/championship-repository.typeorm';
import { TeamRepositoryTypeORM } from '../../../../database/typeorm/repositories/team-repository.typeorm';
import { Controller } from '../../shared/controller';
import { DrawMatchesInputDto } from '../dtos/draw-matches-input.dto';
import { DrawMatchesOutput } from './../../../../../core/bracket/model/draw-matches.output';
import { DrawMatchesUseCase } from './../../../../../core/bracket/usecase/draw-matches.usecase';

class DrawMatchesController extends Controller {

  constructor(
    private readonly drawMatchesUseCase: DrawMatchesUseCase,
    protected readonly dto?: any
  ) {
    super(dto)
  }


  protected execute = async (req: Request): Promise<DrawMatchesOutput[]> => {

    const championshipId = req.params?.championshipId
    const teams = req.body.teams

    const obj: DrawMatchesInput = {
      championshipId,
      teams
    }

    return this.drawMatchesUseCase.execute(obj)

  }

}

const bracketRepository = new BracketRepositoryTypeORM()
const championshipRepository = new ChampionshipRepositoryTypeORM()
const teamRepository = new TeamRepositoryTypeORM()
const shuffleArray = new ShuffleArray()
const drawMatchesUseCase = new DrawMatchesUseCase(bracketRepository, championshipRepository, teamRepository, shuffleArray)

export default new DrawMatchesController(drawMatchesUseCase, DrawMatchesInputDto)