import { DataSource } from 'typeorm';

import { Round } from '../../../../../core/bracket/model/round.enum';
import { AppDataSource } from '../../data-source';
import { BracketEntity } from '../../entities/bracket.entity';
import { ChampionshipEntity } from '../../entities/championship.entity';
import { TeamEntity } from '../../entities/team.entity';
import { BracketRepositoryTypeORM } from '../bracket-repository.typeorm';
import { ChampionshipRepositoryTypeORM } from '../championship-repository.typeorm';
import { TeamRepositoryTypeORM } from '../team-repository.typeorm';


describe('BracketRepositoryTypeORM unit tests', () => {

  let connection: DataSource
  let sut: BracketRepositoryTypeORM

  let championship: ChampionshipEntity
  let championshipRepository: ChampionshipRepositoryTypeORM
  let teamRepository: TeamRepositoryTypeORM

  beforeAll(async () => {

    await AppDataSource.initialize().then(async (con) => {
      connection = con
      sut = new BracketRepositoryTypeORM()

      championshipRepository = new ChampionshipRepositoryTypeORM()
      teamRepository = new TeamRepositoryTypeORM()


      let teamEntity = new TeamEntity()
      championship = new ChampionshipEntity()

      teamEntity.name = 'Team A'
      championship.name = 'Championship A'

      championship = await championshipRepository.save(championship)
      teamEntity = await teamRepository.save(teamEntity)

      for (let i = 0; i < 16; i++) {

        const bracketEntity = new BracketEntity()

        bracketEntity.championship = championship
        bracketEntity.realized = true
        bracketEntity.round = Round.ROUND_OF_16
        bracketEntity.team_a_points = 1
        bracketEntity.team_b_points = 1
        bracketEntity.team_a = teamEntity
        bracketEntity.team_b = teamEntity

        await sut.save(bracketEntity)

      }

      for (let i = 0; i < 8; i++) {

        const bracketEntity = new BracketEntity()

        bracketEntity.championship = championship
        bracketEntity.realized = true
        bracketEntity.round = Round.QUARTER_FINAL
        bracketEntity.team_a_points = 1
        bracketEntity.team_b_points = 1
        bracketEntity.team_a = teamEntity
        bracketEntity.team_b = teamEntity

        await sut.save(bracketEntity)

      }
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

  test('I expect the getChampionship method to return me a list with 24 records', async () => {

    const resultList = await sut.getChampionship(championship.id as string)

    expect(resultList).toHaveLength(24)

  })

  test('I expect the getChampionship method filtering by round to return 16 and 8 records from the list', async () => {

    const resultRound16 = await sut.getChampionship(championship.id as string, Round.ROUND_OF_16)
    const resultRoundQuarter = await sut.getChampionship(championship.id as string, Round.QUARTER_FINAL)

    expect(resultRound16).toHaveLength(16)
    expect(resultRoundQuarter).toHaveLength(8)

  })

})