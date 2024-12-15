import { BracketRepositoryInMemory } from '../../../../../infra/database/in-memory/bracket-repository.in-memory'
import { createChampionshipMock } from '../../../../../mocks/__tests__/championship.mock'
import { createTeamMock } from '../../../../../mocks/__tests__/team.mock'
import { DrawMatchesInput } from '../../../model/draw-matches.input'
import { DrawMatchesUseCase } from '../../draw-matches.usecase'

describe('DrawMatchesUseCase unit tests', () => {

  let sut: DrawMatchesUseCase
  let repository: BracketRepositoryInMemory

  beforeAll(() => {

    repository = new BracketRepositoryInMemory()
    sut = new DrawMatchesUseCase(repository)

  })

  test('I expect to be defined', () => {

    expect(sut).toBeDefined()
    expect(repository).toBeDefined()

  })

  test('I expect that create the bracket for the round of 16 competitions', async () => {

    const championship = createChampionshipMock(true)
    const teams = []

    for (let i = 0; i < 16; i++) {
      teams.push(createTeamMock(true))
    }

    const objt: DrawMatchesInput = {
      championship,
      teams
    }

    const result = await sut.execute(objt)

    expect(result).toBeTruthy()
    expect(result).toHaveLength(8)

  })

})