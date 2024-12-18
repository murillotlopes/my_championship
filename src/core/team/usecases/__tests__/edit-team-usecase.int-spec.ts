import TeamRepositoryInMemory from '../../../../infra/database/in-memory/team-repository.in-memory'
import { EditTeamUseCase } from '../edit-team.usecase'

describe('EditTeamUseCase integration tests', () => {

  let repository: TeamRepositoryInMemory
  let sut: EditTeamUseCase

  beforeAll(() => {

    repository = new TeamRepositoryInMemory()
    sut = new EditTeamUseCase(repository)

  })

  test('I expect to be defined', () => {

    expect(repository).toBeDefined()
    expect(sut).toBeDefined()

  })

  test('I expect the name of the team is changed', async () => {

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
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Resource not found')
    }

  })

})