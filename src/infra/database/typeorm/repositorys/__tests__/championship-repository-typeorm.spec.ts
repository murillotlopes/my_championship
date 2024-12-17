import { DataSource } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { ChampionshipEntity } from '../../entities/championship.entity'
import { ChampionshipRepositoryTypeORM } from '../championship-repository.typeorm'

describe('ChampionshipRepositoryTypeORM unit tests', () => {

  let connection: DataSource
  let sut: ChampionshipRepositoryTypeORM

  beforeAll(async () => {
    await AppDataSource.initialize().then(async (con) => {
      connection = con
      sut = new ChampionshipRepositoryTypeORM()
    })
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test('I expect to be defined', () => {

    expect(connection).toBeDefined()
    expect(sut).toBeDefined()

  })

  test('I expect the save method to create an object and return it to me', async () => {

    const newChampionship = new ChampionshipEntity()
    newChampionship.name = 'Championship A'

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

    const newChampionship = new ChampionshipEntity()
    newChampionship.name = 'Championship B'

    const createdChampionshit = await sut.save(newChampionship)

    const championshit = await sut.getById(newChampionship.id as string)

    expect(championshit).toBeTruthy()
    expect(championshit?.id).toBe(createdChampionshit.id)

  })

  test('I expect the update method to update the parts of a given object', async () => {

    const newChampionship = new ChampionshipEntity()
    newChampionship.name = 'Championship C'

    const createdChampionshit = await sut.save(newChampionship)

    createdChampionshit.name = 'Championship CA'

    const updated = await sut.update(createdChampionshit, createdChampionshit.id as string)

    const retrive = await sut.getById(createdChampionshit.id as string)

    expect(updated?.name).toBe('Championship CA')
    expect(updated).toEqual(retrive)

  })

  test('I expect the delete method removes some information', async () => {

    const newChampionship = new ChampionshipEntity()
    newChampionship.name = 'Championship D'

    const createdChampionshit = await sut.save(newChampionship)
    const retrive = await sut.getById(createdChampionshit.id as string)

    await sut.delete(createdChampionshit.id as string)

    expect(retrive).toBeTruthy()

    try {
      await sut.getById(createdChampionshit.id as string)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }

  })

})