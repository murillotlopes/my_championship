import { BracketRepositoryInMemory } from '../../../../infra/database/in-memory/bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import TeamRepositoryInMemory from '../../../../infra/database/in-memory/team-repository.in-memory'
import { createResultChampionshipMock } from '../../../../mocks/__tests__/create-result-championship.mock'
import { DeleteTeamUseCase } from '../delete-team.usecase'

describe('DeleteTeamUseCase integration tests', () => {

  let championshipRepository: ChampionshipRepositoryInMemory
  let bracketRepository: BracketRepositoryInMemory
  let teamRepository: TeamRepositoryInMemory
  let sut: DeleteTeamUseCase

  beforeAll(() => {

    championshipRepository = new ChampionshipRepositoryInMemory()
    bracketRepository = new BracketRepositoryInMemory()
    teamRepository = new TeamRepositoryInMemory()
    sut = new DeleteTeamUseCase(teamRepository, bracketRepository)

  })

  test('I expect to be defined', () => {

    expect(championshipRepository).toBeDefined()
    expect(bracketRepository).toBeDefined()
    expect(teamRepository).toBeDefined()
    expect(sut).toBeDefined()

  })

  test('I expect the team is erased', async () => {

    const objt = { name: 'Before' }
    const saved = await teamRepository.save(objt)

    const result = await sut.execute(saved.id)

    const deleted = await teamRepository.getById(saved.id)

    expect(result).toBeTruthy()
    expect(result.id).toBe(saved.id)
    expect(deleted).toBeFalsy

  })

  test('I expect an exception to be thrown when trying to delete a league with matches', async () => {

    const { teamList } = await createResultChampionshipMock(bracketRepository, championshipRepository, teamRepository)

    for (const team of teamList) {

      try {
        await sut.execute(team.id)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('The team is already registered in a match and cannot be deleted')
      }

    }

  })

  test('I expect an exception to be thrown when the id does not exist', async () => {

    try {
      await sut.execute('fake id')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Resource not found')
    }

  })

})