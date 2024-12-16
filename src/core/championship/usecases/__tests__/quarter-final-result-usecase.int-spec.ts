import { BracketRepositoryInMemory } from '../../../../infra/database/in-memory/bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import { DefineWinnerService } from '../../../shared/services/define-winner.service'
import { GenerateMatchScoreService } from '../../../shared/services/generate-match-score.service'
import { QuarterFinalResultUseCase } from '../quarter-final-result.usecase'

describe('QuarterFinalResultUseCase integration tests', () => {

  let championshipRepository: ChampionshipRepositoryInMemory
  let bracketRepository: BracketRepositoryInMemory
  let defineWinnerService: DefineWinnerService
  let generateMatchScoreService: GenerateMatchScoreService
  let sut: QuarterFinalResultUseCase

  beforeAll(() => {

    championshipRepository = new ChampionshipRepositoryInMemory()
    bracketRepository = new BracketRepositoryInMemory()
    defineWinnerService = new DefineWinnerService(bracketRepository)
    generateMatchScoreService = new GenerateMatchScoreService()
    sut = new QuarterFinalResultUseCase(championshipRepository, bracketRepository, defineWinnerService, generateMatchScoreService)

  })

  test('I expect to be defined', () => {

    expect(championshipRepository).toBeDefined()
    expect(bracketRepository).toBeDefined()
    expect(defineWinnerService).toBeDefined()
    expect(generateMatchScoreService).toBeDefined()
    expect(sut).toBeDefined()

  })

  test('I expect it to return an object that contains the attributes quarter_final and semi_final', async () => {

    // validar atributos
    // validar se quarter possui 4 chaves
    // validar se semi possui 2 chaves
    // Se é a mesma instancia do output

  })

  test('I expect an exception to be thrown when the championship does not exist', async () => {


  })

  test('I expect an exception to be issued once the quarter final have already been set', async () => {


  })



})