import { BracketRepositoryInMemory } from '../../../../infra/database/in-memory/bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import { DefineWinnerService } from '../../../shared/services/define-winner.service'
import { GenerateMatchScoreService } from '../../../shared/services/generate-match-score.service'
import { Round16ResultUseCase } from '../round-16-result.usecase'

describe('Round16ResultUseCase integration tests', () => {

  let sut: Round16ResultUseCase
  let championshipRepository: ChampionshipRepositoryInMemory
  let bracketRepository: BracketRepositoryInMemory
  let defineWinnerService: DefineWinnerService
  let generateMatchScoreService: GenerateMatchScoreService

  beforeAll(() => {

    championshipRepository = new ChampionshipRepositoryInMemory()
    bracketRepository = new BracketRepositoryInMemory()
    defineWinnerService = new DefineWinnerService(bracketRepository)
    generateMatchScoreService = new GenerateMatchScoreService()
    sut = new Round16ResultUseCase(championshipRepository, bracketRepository, defineWinnerService, generateMatchScoreService)

  })

  test('I expect to be defined', () => {

    expect(championshipRepository).toBeDefined()
    expect(bracketRepository).toBeDefined()
    expect(defineWinnerService).toBeDefined()
    expect(generateMatchScoreService).toBeDefined()
    expect(sut).toBeDefined()

  })




})