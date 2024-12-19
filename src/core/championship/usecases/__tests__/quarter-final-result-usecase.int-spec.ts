import { BracketRepositoryInMemory } from '../../../../infra/database/in-memory/bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import TeamRepositoryInMemory from '../../../../infra/database/in-memory/team-repository.in-memory'
import { createChampionshipMock } from '../../../../mocks/__tests__/championship.mock'
import { createTeamMock } from '../../../../mocks/__tests__/team.mock'
import { BracketModel } from '../../../bracket/model/bracket.model'
import { Round } from '../../../bracket/model/round.enum'
import { ForbiddenException } from '../../../shared/errs/forbidden-exception'
import { DefineWinnerService } from '../../../shared/services/define-winner.service'
import { GenerateMatchScoreService } from '../../../shared/services/generate-match-score.service'
import { ShuffleArray } from '../../../shared/services/shuffle-array.service'
import { ChampionshipModel } from '../../model/championship.model'
import { QuarterFinalResultUseCase } from '../quarter-final-result.usecase'

describe('QuarterFinalResultUseCase integration tests', () => {

  let championshipRepository: ChampionshipRepositoryInMemory
  let bracketRepository: BracketRepositoryInMemory
  let defineWinnerService: DefineWinnerService
  let generateMatchScoreService: GenerateMatchScoreService
  let shuffleArray: ShuffleArray
  let sut: QuarterFinalResultUseCase

  let teamRepository: TeamRepositoryInMemory
  let championship: ChampionshipModel

  beforeEach(async () => {

    championshipRepository = new ChampionshipRepositoryInMemory()
    bracketRepository = new BracketRepositoryInMemory()
    defineWinnerService = new DefineWinnerService(bracketRepository)
    generateMatchScoreService = new GenerateMatchScoreService()
    shuffleArray = new ShuffleArray()
    sut = new QuarterFinalResultUseCase(championshipRepository, bracketRepository, defineWinnerService, generateMatchScoreService, shuffleArray)

    teamRepository = new TeamRepositoryInMemory()

    const championshipMock = createChampionshipMock()
    const teams = []

    championship = await championshipRepository.save(championshipMock)

    for (let i = 0; i < 8; i++) {
      const teamMock = createTeamMock()
      const team = await teamRepository.save(teamMock)
      teams.push(team)
    }

    for (let i = 0; i < 8; i += 2) {

      const obj: BracketModel = {
        championship,
        realized: false,
        round: Round.QUARTER_FINAL,
        team_a: teams[i],
        team_b: teams[i + 1]
      }

      await bracketRepository.save(obj)

    }

  })

  test('I expect to be defined', () => {

    expect(championshipRepository).toBeDefined()
    expect(bracketRepository).toBeDefined()
    expect(defineWinnerService).toBeDefined()
    expect(generateMatchScoreService).toBeDefined()
    expect(shuffleArray).toBeDefined()
    expect(sut).toBeDefined()

    expect(teamRepository).toBeDefined()

  })

  test('I expect it to return an object that contains the attributes quarter_final and semi_final', async () => {

    const result = await sut.execute(championship.id as string)

    expect(result).toBeTruthy()
    expect(result).toHaveProperty('quarter_final')
    expect(result.quarter_final).toHaveLength(4)
    expect(result).toHaveProperty('semi_final')
    expect(result.semi_final).toHaveLength(2)

  })

  test('I expect an exception to be thrown when the championship does not exist', async () => {

    try {
      await sut.execute('non-existent-id')
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error['message']).toBe('Championship not found')
    }

  })

  test('I expect an exception to be issued once the quarter final have already been set', async () => {

    const bracketList = await bracketRepository.getChampionship(championship.id as string, Round.QUARTER_FINAL)

    bracketList.forEach(async (item) => {
      item.realized = true
      await bracketRepository.update(item, item.id as string)
    })

    try {
      await sut.execute(championship.id as string)
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error)
      expect(error['message']).toBe('Quarter final already classified')
    }

  })

  test('I expect an exception to be thrown when teams have not been registered in the championship', async () => {

    let championshipWithoutTeams = await championshipRepository.save({ name: 'Championship without teams' })

    try {
      await sut.execute(championshipWithoutTeams.id as string)
    } catch (error: any) {
      expect(error).toBeInstanceOf(ForbiddenException)
      expect(error['message']).toBe('Championship without registered teams. Register them first before you get the results of the quarterfinals')
    }

  })

})