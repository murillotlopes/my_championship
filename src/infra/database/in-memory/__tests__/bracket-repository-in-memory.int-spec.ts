import { ChampionshipModel } from '../../../../core/championship/model/championship.model'
import { TeamModel } from '../../../../core/team/model/team.model'
import { createResultChampionshipMock } from '../../../../mocks/__tests__/create-result-championship.mock'
import { BracketRepositoryInMemory } from '../bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../championship-repository.in-memory'
import TeamRepositoryInMemory from '../team-repository.in-memory'

describe('BracketRepositoryInMemory integration tests', () => {

  let sut: BracketRepositoryInMemory
  let championshipRepository: ChampionshipRepositoryInMemory
  let teamRepository: TeamRepositoryInMemory

  let championship: ChampionshipModel
  let teamList: TeamModel[]

  beforeAll(async () => {

    sut = new BracketRepositoryInMemory()
    championshipRepository = new ChampionshipRepositoryInMemory()
    teamRepository = new TeamRepositoryInMemory()

    const mocks = await createResultChampionshipMock(sut, championshipRepository, teamRepository)

    championship = mocks.championshipSaved
    teamList = mocks.teamList

  })

  test('I expect to be defined', () => {

    expect(sut).toBeDefined()
    expect(championshipRepository).toBeDefined()
    expect(teamRepository).toBeDefined()

  })

  test('I expect the teams to have a certain score', async () => {

    const expectScoreList = [3, -3, 3, -3, 4, -1, -2, -1]
    for (let i = 0; i < 8; i++) {

      const team = teamList[i]
      const score = await sut.score(championship.id as string, team.id as string)

      expect(score).toBe(expectScoreList[i])

    }

  })

})