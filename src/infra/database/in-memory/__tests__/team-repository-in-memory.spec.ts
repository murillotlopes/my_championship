import { TeamModel } from '../../../../core/team/model/team.model'
import TeamRepositoryInMemory from '../team-repository.in-memory'

describe('TeamRepositoryInMemory unit tests', () => {

  const sut = new TeamRepositoryInMemory()

  test('I expect the save method to create an object and return it to me', async () => {

    const obj: TeamModel = { name: 'Team A' }

    const created = await sut.save(obj)

    expect(created).toBeTruthy()

    expect(created.name).toEqual('Team A')

    expect(created.id).toBeTruthy()
    expect(typeof created.id).toBe('string')

    expect(created.created_at).toBeTruthy()
    expect(created.created_at instanceof Date).toBe(true)

    expect(created.updated_at).toBeTruthy()
    expect(created.updated_at instanceof Date).toBe(true)

  })

  test('I expect the getList method to return a list', async () => {

    const list = await sut.getList()

    expect(list).toBeTruthy()
    expect(Array.isArray(list)).toBe(true)
    expect(list.length).toBeGreaterThan(0)

  })

  test('I expect the getById method to return an object', async () => {

    const obj: TeamModel = { name: 'Team B' }

    const created = await sut.save(obj)

    const retrived = await sut.getById(created.id as string)

    expect(retrived).toBeTruthy()
    expect(retrived?.id).toBe(created.id)

  })

  test('I expect the update method to update the parts of a given object', async () => {

    const obj: TeamModel = { name: 'Team C' }
    const updateObj = { name: 'Team CA' }

    const created = await sut.save(obj)

    const updated = await sut.update(updateObj, created.id as string)

    const retrived = await sut.getById(created.id as string)

    expect(updated?.name).toBe('Team CA')
    expect(updated).toEqual(retrived)

  })

  test('I expect the delete method removes some information', async () => {

    const obj: TeamModel = { name: 'Team D' }

    const created = await sut.save(obj)
    const retrived = await sut.getById(created.id as string)

    await sut.delete(created.id as string)

    const deleted = await sut.getById(created.id as string)

    expect(retrived).toBeTruthy()
    expect(deleted).toBeFalsy()

  })

})