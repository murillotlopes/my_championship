import { Request } from 'express';
import { DrawMatchesInput } from '../../../../../core/bracket/model/draw-matches.input';
import { ShuffleArray } from '../../../../../core/shared/services/shuffle-array.service';
import { BracketRepositoryInMemory } from '../../../../database/in-memory/bracket-repository.in-memory';
import { ChampionshipRepositoryInMemory } from '../../../../database/in-memory/championship-repository.in-memory';
import TeamRepositoryInMemory from '../../../../database/in-memory/team-repository.in-memory';
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
    const body = req.body

    const obj: DrawMatchesInput = {
      championshipId,
      teams: body
    }

    return this.drawMatchesUseCase.execute(obj)

  }

}

const bracketRepositoryInMemory = new BracketRepositoryInMemory()
const championshipRepository = new ChampionshipRepositoryInMemory()
const teamRepository = new TeamRepositoryInMemory()
const shuffleArray = new ShuffleArray()
const drawMatchesUseCase = new DrawMatchesUseCase(bracketRepositoryInMemory, championshipRepository, teamRepository, shuffleArray)

export default new DrawMatchesController(drawMatchesUseCase, DrawMatchesInputDto)