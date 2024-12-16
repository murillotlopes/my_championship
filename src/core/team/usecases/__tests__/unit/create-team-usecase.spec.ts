import TeamRepositoryInMemory from '../../../../../infra/database/in-memory/team-repository.in-memory'
import { Repository } from '../../../../shared/providers/repository'
import { TeamModel } from '../../../model/team.model'
import { CreateTeamUseCase } from '../../create-team.usecase'

describe('CreateTeamUseCase unit tests', () => {

  let sut: CreateTeamUseCase
  let repository: Repository<TeamModel>

  beforeAll(() => {

    repository = new TeamRepositoryInMemory()
    sut = new CreateTeamUseCase(repository)

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