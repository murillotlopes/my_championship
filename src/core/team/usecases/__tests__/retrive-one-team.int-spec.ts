import TeamRepositoryInMemory from '../../../../infra/database/in-memory/team-repository.in-memory'
import { Repository } from '../../../shared/providers/repository'
import { TeamModel } from '../../model/team.model'
import { RetriveOneTeamUseCase } from '../retrive-one-team.usecase'

describe('RetriveOneChampionshipUseCase integration tests', () => {

  let sut: RetriveOneTeamUseCase
  let repository: Repository<TeamModel>

  beforeAll(() => {

    repository = new TeamRepositoryInMemory()
    sut = new RetriveOneTeamUseCase(repository)

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