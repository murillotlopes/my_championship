import { BracketRepositoryInMemory } from '../../../../infra/database/in-memory/bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import TeamRepositoryInMemory from '../../../../infra/database/in-memory/team-repository.in-memory'
import { createResultChampionshipMock } from '../../../../mocks/__tests__/create-result-championship.mock'
import { Round } from '../../../bracket/model/round.enum'
import { GenerateMatchScoreService } from '../../../shared/services/generate-match-score.service'
import { ChampionshipModel } from '../../model/championship.model'
import { FinalResultUseCase } from '../final-result.usecase'

describe('FinalResultUseCase integration tests', () => {

  let championshipRepository: ChampionshipRepositoryInMemory
  let bracketRepository: BracketRepositoryInMemory
  let generateMatchScoreService: GenerateMatchScoreService
  let sut: FinalResultUseCase

  let teamRepository: TeamRepositoryInMemory
  let championship: ChampionshipModel

  beforeEach(async () => {

    championshipRepository = new ChampionshipRepositoryInMemory()
    bracketRepository = new BracketRepositoryInMemory()
    generateMatchScoreService = new GenerateMatchScoreService()
    sut = new FinalResultUseCase(championshipRepository, bracketRepository, generateMatchScoreService)

    teamRepository = new TeamRepositoryInMemory()

    const { championshipSaved } = await createResultChampionshipMock(bracketRepository, championshipRepository, teamRepository)
    championship = championshipSaved

    const playoffList = await bracketRepository.getChampionship(championship.id as string, Round.FINAL)

    playoffList.forEach(async (item) => {
      item.realized = false
      item.team_a_points = undefined
      item.team_b_points = undefined
      await bracketRepository.update(item, item.id as string)
    })

  })

  test('I expect to be defined', () => {

    expect(championshipRepository).toBeDefined()
    expect(bracketRepository).toBeDefined()
    expect(generateMatchScoreService).toBeDefined()
    expect(sut).toBeDefined()
    expect(teamRepository).toBeDefined()

  })

  test('I expect it to return an object that contains the attributes final', async () => {

    const result = await sut.execute(championship.id as string)

    expect(result).toBeTruthy()
    expect(result).toHaveProperty('final')

  })

  test('I expect an exception to be thrown when the championship does not exist', async () => {

    try {
      await sut.execute('non-existent-id')
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error['message']).toBe('Championship not found')
    }

  })

  test('I expect an exception to be issued once the final have already been set', async () => {

    const bracketList = await bracketRepository.getChampionship(championship.id as string, Round.FINAL)

    bracketList.forEach(async (item) => {
      item.realized = true
      await bracketRepository.update(item, item.id as string)
    })

    try {
      await sut.execute(championship.id as string)
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error['message']).toBe('Final already classified')
    }

  })

})