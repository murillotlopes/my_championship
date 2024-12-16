import { Request } from 'express';
import { DrawMatchesInput } from '../../../../../core/bracket/model/draw-matches.input';
import { ChampionshipModel } from '../../../../../core/championship/model/championship.model';
import { ChampionshipRepositoryProvider } from '../../../../../core/championship/repository/championship-repository.provider';
import { TeamModel } from '../../../../../core/team/model/team.model';
import { TeamRepositoryProvider } from '../../../../../core/team/repository/team-repository.provider';
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
    private readonly championshipRepository: ChampionshipRepositoryProvider<ChampionshipModel>,
    private readonly teamRepository: TeamRepositoryProvider<TeamModel>,
    protected readonly dto?: any
  ) {
    super(dto)
  }


  protected execute = async (req: Request): Promise<DrawMatchesOutput[]> => {

    const championshipId = req.params?.championshipId
    const body = req.body

    const championship = await this.championshipRepository.getById(championshipId)
    const teams: TeamModel[] = []

    for (const id of body) {
      const team = await this.teamRepository.getById(id)
      teams.push(team)
    }

    const obj: DrawMatchesInput = {
      teams,
      championship
    }

    return this.drawMatchesUseCase.execute(obj)

  }

}

const bracketRepositoryInMemory = new BracketRepositoryInMemory()
const drawMatchesUseCase = new DrawMatchesUseCase(bracketRepositoryInMemory)
const championshipRepository = new ChampionshipRepositoryInMemory()
const teamRepository = new TeamRepositoryInMemory()

export default new DrawMatchesController(drawMatchesUseCase, championshipRepository, teamRepository, DrawMatchesInputDto)