import { BracketRepositoryInMemory } from '../../../../infra/database/in-memory/bracket-repository.in-memory';
import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory';
import TeamRepositoryInMemory from '../../../../infra/database/in-memory/team-repository.in-memory';
import { createChampionshipMock } from '../../../../mocks/__tests__/championship.mock';
import { createTeamMock } from '../../../../mocks/__tests__/team.mock';
import { ShuffleArray } from '../../../shared/services/shuffle-array.service';
import { DrawMatchesInput } from '../../model/draw-matches.input';
import { DrawMatchesUseCase } from '../draw-matches.usecase';

describe('DrawMatchesUseCase integration tests', () => {

  let sut: DrawMatchesUseCase
  let bracketRepository: BracketRepositoryInMemory
  let championshipRepository: ChampionshipRepositoryInMemory
  let teamRepository: TeamRepositoryInMemory
  let shuffleArray: ShuffleArray
  let objt: DrawMatchesInput

  beforeEach(async () => {

    bracketRepository = new BracketRepositoryInMemory()
    championshipRepository = new ChampionshipRepositoryInMemory()
    teamRepository = new TeamRepositoryInMemory()
    shuffleArray = new ShuffleArray()
    sut = new DrawMatchesUseCase(bracketRepository, championshipRepository, teamRepository, shuffleArray)

    const championshipMock = createChampionshipMock()
    const teams = []

    const championship = await championshipRepository.save(championshipMock)

    for (let i = 0; i < 8; i++) {
      const teamMock = createTeamMock()
      const team = await teamRepository.save(teamMock)
      teams.push(team)
    }

    objt = {
      championshipId: championship.id as string,
      teams: teams.map(item => item.id as string)
    }

  })

  test('I expect to be defined', () => {

    expect(bracketRepository).toBeDefined()
    expect(championshipRepository).toBeDefined()
    expect(teamRepository).toBeDefined()
    expect(shuffleArray).toBeDefined()
    expect(sut).toBeDefined()

  })

  test('I expect that create the bracket for the quarter final competitions', async () => {

    const result = await sut.execute(objt)

    expect(result).toBeTruthy()
    expect(result).toHaveLength(4)

  })


  test('I expect an exception to be thrown when the championship does not exist', async () => {

    const championship = createChampionshipMock(true)
    objt.championshipId = championship.id as string

    try {
      await sut.execute(objt)
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error['message']).toBe('Championship not found')
    }

  })

  test('I expect an exception when the championship has already been drawn', async () => {

    const result = await sut.execute(objt)

    expect(result).toBeTruthy()
    expect(result).toHaveLength(4)

    try {
      await sut.execute(objt)
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error['message']).toBe('The championship has already been drawn')
    }

  })

})