import { BracketRepositoryInMemory } from '../../../../infra/database/in-memory/bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import TeamRepositoryInMemory from '../../../../infra/database/in-memory/team-repository.in-memory'
import { createResultChampionshipMock } from '../../../../mocks/__tests__/create-result-championship.mock'
import { DeleteChampionshipUseCase } from '../delete-championship.usecase'

describe('EditChampionshipUseCase integration tests', () => {

  let championshipRepository: ChampionshipRepositoryInMemory
  let bracketRepository: BracketRepositoryInMemory
  let teamRepository: TeamRepositoryInMemory
  let sut: DeleteChampionshipUseCase

  beforeAll(() => {

    championshipRepository = new ChampionshipRepositoryInMemory()
    bracketRepository = new BracketRepositoryInMemory()
    teamRepository = new TeamRepositoryInMemory()
    sut = new DeleteChampionshipUseCase(championshipRepository, bracketRepository)

  })

  test('I expect to be defined', () => {

    expect(championshipRepository).toBeDefined()
    expect(bracketRepository).toBeDefined()
    expect(teamRepository).toBeDefined()
    expect(sut).toBeDefined()

  })

  test('I expect the championship is erased', async () => {

    const objt = { name: 'Before' }
    const saved = await championshipRepository.save(objt)

    const result = await sut.execute(saved.id)

    const deleted = await championshipRepository.getById(saved.id)

    expect(result).toBeTruthy()
    expect(result.id).toBe(saved.id)
    expect(deleted).toBeFalsy

  })

  test('I expect an exception to be thrown when trying to delete a league with matches', async () => {

    const { championshipSaved } = await createResultChampionshipMock(bracketRepository, championshipRepository, teamRepository)

    try {
      await sut.execute(championshipSaved.id)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('The championship has registered matches and cannot be deleted')
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