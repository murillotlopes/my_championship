import { DataSource } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { ChampionshipEntity } from '../../entities/championship.entity'
import { TeamEntity } from '../../entities/team.entity'
import { BracketRepositoryTypeORM } from '../bracket-repository.typeorm'
import { ChampionshipRepositoryTypeORM } from '../championship-repository.typeorm'
import { TeamRepositoryTypeORM } from '../team-repository.typeorm'


describe('BracketRepositoryTypeORM integration tests', () => {

  let connection: DataSource
  let sut: BracketRepositoryTypeORM
  let championshipRepository: ChampionshipRepositoryTypeORM
  let teamRepository: TeamRepositoryTypeORM

  let championship: ChampionshipEntity
  let teamList: TeamEntity[]

  beforeAll(async () => {

    await AppDataSource.initialize().then(async (con) => {
      connection = con
      sut = new BracketRepositoryTypeORM()

      championshipRepository = new ChampionshipRepositoryTypeORM()
      teamRepository = new TeamRepositoryTypeORM()

      // const mocks = await createResultChampionshipMock(sut, championshipRepository, teamRepository)

      // championship = mocks.championshipSaved as ChampionshipEntity
      // teamList = mocks.teamList as TeamEntity[]

    })

  })

  afterAll(async () => {
    await connection.destroy()
  })

  test('I expect to be defined', () => {

    expect(connection).toBeDefined()
    expect(sut).toBeDefined()

    expect(championshipRepository).toBeDefined()
    expect(teamRepository).toBeDefined()

  })

  // test('I expect the teams to have a certain score', async () => {

  //   const expectScoreList = [3, -3, 3, -3, 4, -1, -2, -1]
  //   for (let i = 0; i < 8; i++) {

  //     const team = teamList[i]
  //     const score = await sut.score(championship.id as string, team.id as string)

  //     expect(score).toBe(expectScoreList[i])

  //   }

  // })

})