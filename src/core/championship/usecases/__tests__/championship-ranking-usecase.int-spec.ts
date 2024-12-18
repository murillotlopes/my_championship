import { BracketRepositoryInMemory } from '../../../../infra/database/in-memory/bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import TeamRepositoryInMemory from '../../../../infra/database/in-memory/team-repository.in-memory'
import { championshipRankingMock } from '../../../../mocks/__tests__/championship-ranking.mock'
import { createResultChampionshipMock } from '../../../../mocks/__tests__/create-result-championship.mock'
import { Round } from '../../../bracket/model/round.enum'
import { DefineWinnerService } from '../../../shared/services/define-winner.service'
import { TeamModel } from '../../../team/model/team.model'
import { ChampionshipModel } from '../../model/championship.model'
import { ChampionshipRankingUseCase } from '../championship-ranking.usecase'

describe('ChampionshipRankingUseCase integration tests', () => {

  let championshipRepository: ChampionshipRepositoryInMemory
  let bracketRepository: BracketRepositoryInMemory
  let defineWinnerService: DefineWinnerService
  let sut: ChampionshipRankingUseCase

  let teamRepository: TeamRepositoryInMemory
  let championship: ChampionshipModel
  let teams: TeamModel[]

  beforeEach(async () => {

    championshipRepository = new ChampionshipRepositoryInMemory()
    bracketRepository = new BracketRepositoryInMemory()
    defineWinnerService = new DefineWinnerService(bracketRepository)
    sut = new ChampionshipRankingUseCase(championshipRepository, bracketRepository, defineWinnerService)

    teamRepository = new TeamRepositoryInMemory()

    const { championshipSaved, teamList } = await createResultChampionshipMock(bracketRepository, championshipRepository, teamRepository)

    championship = championshipSaved
    teams = teamList

  })

  test('I expect to be defined', () => {

    expect(championshipRepository).toBeDefined()
    expect(bracketRepository).toBeDefined()
    expect(defineWinnerService).toBeDefined()
    expect(sut).toBeDefined()
    expect(teamRepository).toBeDefined()

  })

  test('I expect it to return an object that contains the attributes championship and ranking', async () => {

    const result = await sut.execute(championship.id as string)

    expect(result).toBeTruthy()
    expect(result).toHaveProperty('championship')
    expect(result).toHaveProperty('ranking')
    expect(result.ranking).toHaveLength(8)

  })

  test('I expect the teams ranking to be equal to the one provided', async () => {

    const result = await sut.execute(championship.id as string)
    const classificationMock = championshipRankingMock(championship, teams)

    expect(result.championship).toStrictEqual(classificationMock.championship)
    expect(result.ranking).toStrictEqual(classificationMock.ranking)

  })

  test('I expect an exception to be thrown when the championship does not exist', async () => {

    try {
      await sut.execute('non-existent-id')
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error['message']).toBe('Championship not found')
    }

  })

  test('I expect an exception to be thrown if the tournament has not finished', async () => {

    const bracketList = await bracketRepository.getChampionship(championship.id as string, Round.FINAL)

    bracketList.forEach(async (item) => {
      item.realized = false
      await bracketRepository.update(item, item.id as string)
    })

    try {
      await sut.execute(championship.id as string)
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error['message']).toBe('The championship has not been finalized')
    }

  })



})