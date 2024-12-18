import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import { Repository } from '../../../shared/providers/repository'
import { ChampionshipModel } from '../../model/championship.model'
import { RetriveChampionshipUseCase } from '../retrive-championship.usecase'

describe('RetriveChampionshipUseCase integration tests', () => {

  let sut: RetriveChampionshipUseCase
  let repository: Repository<ChampionshipModel>

  beforeAll(() => {

    repository = new ChampionshipRepositoryInMemory()
    sut = new RetriveChampionshipUseCase(repository)

  })

  test('I expect to be defined', () => {

    expect(sut).toBeDefined()
    expect(repository).toBeDefined()

  })

  test('I expect it to return a list', async () => {

    const objt = { name: 'Test' }
    await repository.save(objt)

    const result = await sut.execute()

    expect(result).toBeTruthy()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)

  })

})