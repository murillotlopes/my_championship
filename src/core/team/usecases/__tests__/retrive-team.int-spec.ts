import TeamRepositoryInMemory from '../../../../infra/database/in-memory/team-repository.in-memory'
import { RetriveTeamUseCase } from '../retrive-team.usecase'

describe('RetriveChampionshipUseCase integration tests', () => {

  let sut: RetriveTeamUseCase
  let repository: TeamRepositoryInMemory

  beforeAll(() => {

    repository = new TeamRepositoryInMemory()
    sut = new RetriveTeamUseCase(repository)

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