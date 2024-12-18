import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import { Repository } from '../../../shared/providers/repository'
import { ChampionshipModel } from '../../model/championship.model'
import { RetriveOneChampionshipUseCase } from '../retrive-one-championship.usecase'

describe('RetriveOneChampionshipUseCase integration tests', () => {

  let sut: RetriveOneChampionshipUseCase
  let repository: Repository<ChampionshipModel>

  beforeAll(() => {

    repository = new ChampionshipRepositoryInMemory()
    sut = new RetriveOneChampionshipUseCase(repository)

  })

  test('I expect to be defined', () => {

    expect(sut).toBeDefined()
    expect(repository).toBeDefined()

  })

  test('I expect it to return an object', async () => {

    const objt = { name: 'Test' }
    const saved = await repository.save(objt)

    const result = await sut.execute(saved.id)

    expect(result).toBeTruthy()
    expect(result.name).toBe('Test')
    expect(result.id).toBe(saved.id)

  })

})