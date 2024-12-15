import { ChampionshipRepositoryInMemory } from '../../../../../infra/database/in-memory/championship-repository.in-memory'
import { Repository } from '../../../../shared/ports/repository'
import { ChampionshipModel } from '../../../model/championship.model'
import { CreateChampionshipUseCase } from '../../create-championshipt.usecase'

describe('CreateChampionshipUseCase unit tests', () => {

  let sut: CreateChampionshipUseCase
  let repository: Repository<ChampionshipModel>

  beforeAll(() => {

    repository = new ChampionshipRepositoryInMemory()
    sut = new CreateChampionshipUseCase(repository)

  })

  test('I expect to be defined', () => {

    expect(sut).toBeDefined()
    expect(repository).toBeDefined()

  })

  test('I expect the data to be saved and return an object', async () => {

    const objt = { name: 'Test' }

    const result = await sut.execute(objt)

    expect(result).toBeTruthy()
    expect(typeof result.id).toBe('string')

  })

})