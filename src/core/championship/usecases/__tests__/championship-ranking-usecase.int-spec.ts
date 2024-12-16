import { BracketRepositoryInMemory } from '../../../../infra/database/in-memory/bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import { DefineWinnerService } from '../../../shared/services/define-winner.service'
import { ChampionshipRankingUseCase } from '../championship-ranking.usecase'

describe('ChampionshipRankingUseCase integration tests', () => {

  let championshipRepository: ChampionshipRepositoryInMemory
  let bracketRepository: BracketRepositoryInMemory
  let defineWinnerService: DefineWinnerService
  let sut: ChampionshipRankingUseCase

  beforeAll(() => {

    championshipRepository = new ChampionshipRepositoryInMemory()
    bracketRepository = new BracketRepositoryInMemory()
    defineWinnerService = new DefineWinnerService(bracketRepository)
    sut = new ChampionshipRankingUseCase(championshipRepository, bracketRepository, defineWinnerService)

  })

  test('I expect to be defined', () => {

    expect(championshipRepository).toBeDefined()
    expect(bracketRepository).toBeDefined()
    expect(defineWinnerService).toBeDefined()
    expect(sut).toBeDefined()

  })

  test('I expect it to return an object that contains the attributes championship and ranking', async () => {

    // validar atributos
    // validar se championship é instancia de championshipModel
    // validar se ranking possui 8 elementos
    // Se é a mesma instancia do output

  })

  test('I expect the teams ranking to be equal to the one provided', async () => {

  })

  test('I expect an exception to be thrown when the championship does not exist', async () => {


  })

  test('I expect an exception to be issued if the tournament is over.', async () => {


  })



})