import { BracketRepositoryInMemory } from '../../../../infra/database/in-memory/bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import { GenerateMatchScoreService } from '../../../shared/services/generate-match-score.service'
import { ThirdPlaceResultUseCase } from '../third-place-result.usecase'

describe('ThirdPlaceResultUseCase integration tests', () => {

  let championshipRepository: ChampionshipRepositoryInMemory
  let bracketRepository: BracketRepositoryInMemory
  let generateMatchScoreService: GenerateMatchScoreService
  let sut: ThirdPlaceResultUseCase

  beforeAll(() => {

    championshipRepository = new ChampionshipRepositoryInMemory()
    bracketRepository = new BracketRepositoryInMemory()
    generateMatchScoreService = new GenerateMatchScoreService()
    sut = new ThirdPlaceResultUseCase(championshipRepository, bracketRepository, generateMatchScoreService)

  })

  test('I expect to be defined', () => {

    expect(championshipRepository).toBeDefined()
    expect(bracketRepository).toBeDefined()
    expect(generateMatchScoreService).toBeDefined()
    expect(sut).toBeDefined()

  })

  test('I expect it to return an object that contains the attributes third_place', async () => {

    // validar atributos
    // validar se third_place é instancia de BracketModel
    // Se é a mesma instancia do output

  })

  test('I expect an exception to be thrown when the championship does not exist', async () => {


  })

  test('I expect an exception to be issued once the third place playoff have already been set', async () => {


  })

})