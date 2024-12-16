import { BracketRepositoryInMemory } from '../../../../infra/database/in-memory/bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import { DefineWinnerService } from '../../../shared/services/define-winner.service'
import { GenerateMatchScoreService } from '../../../shared/services/generate-match-score.service'
import { SemiFinalResultUseCase } from '../semi-final-result.usecase'

describe('SemiFinalResultUseCase integration tests', () => {

  let championshipRepository: ChampionshipRepositoryInMemory
  let bracketRepository: BracketRepositoryInMemory
  let defineWinnerService: DefineWinnerService
  let generateMatchScoreService: GenerateMatchScoreService
  let sut: SemiFinalResultUseCase

  beforeAll(() => {

    championshipRepository = new ChampionshipRepositoryInMemory()
    bracketRepository = new BracketRepositoryInMemory()
    defineWinnerService = new DefineWinnerService(bracketRepository)
    generateMatchScoreService = new GenerateMatchScoreService()
    sut = new SemiFinalResultUseCase(championshipRepository, bracketRepository, defineWinnerService, generateMatchScoreService)

  })

  test('I expect to be defined', () => {

    expect(championshipRepository).toBeDefined()
    expect(bracketRepository).toBeDefined()
    expect(defineWinnerService).toBeDefined()
    expect(generateMatchScoreService).toBeDefined()
    expect(sut).toBeDefined()

  })

  test('I expect it to return an object that contains the attributes final and third_place_playoff', async () => {

    // validar atributos
    // validar se final e third_place_playoff são instancias de BracketModel
    // Se é a mesma instancia do output

  })

  test('I expect an exception to be thrown when the championship does not exist', async () => {


  })

  test('I expect an exception to be issued once the semi final have already been set', async () => {


  })



})