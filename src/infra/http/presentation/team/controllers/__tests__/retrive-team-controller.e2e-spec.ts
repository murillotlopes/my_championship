import request from 'supertest'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../../../../../database/typeorm/data-source'
import { TeamEntity } from '../../../../../database/typeorm/entities/team.entity'
import { TeamRepositoryTypeORM } from '../../../../../database/typeorm/repositories/team-repository.typeorm'
import app from '../../../../app'

describe('RetriveTeam end to end tests', () => {

  let connection: DataSource
  let teamRepository: TeamRepositoryTypeORM
  let team: TeamEntity

  beforeAll(async () => {

    await AppDataSource.initialize().then(async (con) => {

      connection = con
      teamRepository = new TeamRepositoryTypeORM()
      team = new TeamEntity()
      team.name = 'Team Test'
      team = await teamRepository.save(team)
    })

  })

  afterAll(async () => {
    await connection.destroy()
  })

  test('I expect to be defined', () => {

    expect(connection).toBeDefined()
    expect(teamRepository).toBeDefined()

  })

  test('I hope it returns a list', async () => {
    const response = await request(app).get(`/team`)

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThan(0)

  })

})