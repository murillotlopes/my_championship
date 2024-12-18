import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import { NotFoundException } from '../../../shared/errs/not-found-exception'
import { Repository } from '../../../shared/providers/repository'
import { ChampionshipModel } from '../../model/championship.model'
import { EditChampionshipUseCase } from '../edit-championship.usecase'

describe('EditChampionshipUseCase integration tests', () => {

  let repository: Repository<ChampionshipModel>
  let sut: EditChampionshipUseCase

  beforeAll(() => {

    repository = new ChampionshipRepositoryInMemory()
    sut = new EditChampionshipUseCase(repository)

  })

  test('I expect to be defined', () => {

    expect(repository).toBeDefined()
    expect(sut).toBeDefined()

  })

  test('I expect the name of the championship is changed', async () => {

    const objt = { name: 'Before' }
    const saved = await repository.save(objt)
    saved.name = 'After'

    const result = await sut.execute(saved)

    expect(result).toBeTruthy()
    expect(result.id).toBe(saved.id)
    expect(result.name).toBe('After')

  })

  test('I expect an exception to be thrown when the id does not exist', async () => {

    const objt = { name: 'Before', id: 'fake id' }

    try {
      await sut.execute(objt)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.message).toBe('Championship not found')
    }

  })

})