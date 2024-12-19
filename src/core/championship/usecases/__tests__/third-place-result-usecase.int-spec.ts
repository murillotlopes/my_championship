import { BracketRepositoryInMemory } from '../../../../infra/database/in-memory/bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import TeamRepositoryInMemory from '../../../../infra/database/in-memory/team-repository.in-memory'
import { createResultChampionshipMock } from '../../../../mocks/__tests__/create-result-championship.mock'
import { Round } from '../../../bracket/model/round.enum'
import { ForbiddenException } from '../../../shared/errs/forbidden-exception'
import { DefineWinnerService } from '../../../shared/services/define-winner.service'
import { GenerateMatchScoreService } from '../../../shared/services/generate-match-score.service'
import { ChampionshipModel } from '../../model/championship.model'
import { ThirdPlaceResultUseCase } from '../third-place-result.usecase'

describe('ThirdPlaceResultUseCase integration tests', () => {

  let championshipRepository: ChampionshipRepositoryInMemory
  let bracketRepository: BracketRepositoryInMemory
  let generateMatchScoreService: GenerateMatchScoreService
  let sut: ThirdPlaceResultUseCase

  let teamRepository: TeamRepositoryInMemory
  let championship: ChampionshipModel
  let defineWinnerService: DefineWinnerService

  beforeEach(async () => {

    championshipRepository = new ChampionshipRepositoryInMemory()
    bracketRepository = new BracketRepositoryInMemory()
    generateMatchScoreService = new GenerateMatchScoreService()
    sut = new ThirdPlaceResultUseCase(championshipRepository, bracketRepository, generateMatchScoreService)

    teamRepository = new TeamRepositoryInMemory()
    defineWinnerService = new DefineWinnerService(bracketRepository)

    const { championshipSaved } = await createResultChampionshipMock(bracketRepository, championshipRepository, teamRepository)
    championship = championshipSaved

    const playoffList = await bracketRepository.getChampionship(championship.id as string, Round.THIRD_PLACE_PLAYOFF)

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
    expect(defineWinnerService).toBeDefined()

  })

  test('I expect it to return an object that contains the attributes third_place', async () => {

    const result = await sut.execute(championship.id as string)

    expect(result).toBeTruthy()
    expect(result).toHaveProperty('third_place')

  })

  test('I expect an exception to be thrown when the championship does not exist', async () => {

    try {
      await sut.execute('non-existent-id')
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error['message']).toBe('Championship not found')
    }

  })

  test('I expect an exception to be issued once the third place playoff have already been set', async () => {

    const bracketList = await bracketRepository.getChampionship(championship.id as string, Round.THIRD_PLACE_PLAYOFF)

    bracketList.forEach(async (item) => {
      item.realized = true
      await bracketRepository.update(item, item.id as string)
    })

    try {
      await sut.execute(championship.id as string)
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error['message']).toBe('Third Place Playoff already classified')
    }

  })

  test('I expect an exception to be thrown when the previous championship stage has not occurred', async () => {

    let championshipWithoutTeams = await championshipRepository.save({ name: 'Championship without teams' })

    try {
      await sut.execute(championshipWithoutTeams.id as string)
    } catch (error: any) {
      expect(error).toBeInstanceOf(ForbiddenException)
      expect(error['message']).toBe('Run semi final games before playoff')
    }

  })

})