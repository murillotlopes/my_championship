import { ChampionshipModel } from '../../../../core/championship/model/championship.model'
import ChampionshipRepositoryInMemory from '../championship-repository.in-memory'

describe('ChampionshipRepositoryInMemory unit tests', () => {

  const sut = new ChampionshipRepositoryInMemory()

  test('I expect the save method to create an object and return it to me', async () => {

    const newChampionship: ChampionshipModel = {
      name: 'Championship A'
    }

    const createdChampionshit = await sut.save(newChampionship)

    expect(createdChampionshit).toBeTruthy()

    expect(createdChampionshit.name).toEqual('Championship A')

    expect(createdChampionshit.id).toBeTruthy()
    expect(typeof createdChampionshit.id).toBe('string')

    expect(createdChampionshit.created_at).toBeTruthy()
    expect(createdChampionshit.created_at instanceof Date).toBe(true)

    expect(createdChampionshit.updated_at).toBeTruthy()
    expect(createdChampionshit.updated_at instanceof Date).toBe(true)

  })

  test('I expect the getList method to return a list', async () => {

    const championshitList = await sut.getList()

    expect(championshitList).toBeTruthy()
    expect(Array.isArray(championshitList)).toBe(true)
    expect(championshitList.length).toBeGreaterThan(0)

  })

  test('I expect the getById method to return an object', async () => {

    const newChampionship: ChampionshipModel = {
      name: 'Championship B'
    }

    const createdChampionshit = await sut.save(newChampionship)

    const championshit = await sut.getById(newChampionship.id)

    expect(championshit).toBeTruthy()
    expect(championshit?.id).toBe(createdChampionshit.id)

  })

  test('I expect the update method to update the parts of a given object', async () => {

    const newChampionship = { name: 'Championship C' }
    const update = { name: 'Championship CA' }

    const createdChampionshit = await sut.save(newChampionship)

    const updated = await sut.update(update, createdChampionshit.id)

    const retrive = await sut.getById(createdChampionshit.id)

    expect(updated?.name).toBe('Championship CA')
    expect(updated).toEqual(retrive)

  })

  test('I expect the delete method removes some information', async () => {

    const newChampionship: ChampionshipModel = {
      name: 'Championship D'
    }

    const createdChampionshit = await sut.save(newChampionship)
    const retrive = await sut.getById(createdChampionshit.id)

    await sut.delete(createdChampionshit.id)

    const deleted = await sut.getById(createdChampionshit.id)


    expect(retrive).toBeTruthy()
    expect(deleted).toBeFalsy()

  })

})