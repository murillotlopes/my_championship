import request from 'supertest'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../../../../../database/typeorm/data-source'
import { TeamEntity } from '../../../../../database/typeorm/entities/team.entity'
import { TeamRepositoryTypeORM } from '../../../../../database/typeorm/repositories/team-repository.typeorm'
import app from '../../../../app'

describe('EditTeam end to end tests', () => {

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

  test('I expect I can edit the team name', async () => {
    const response = await request(app).patch(`/team/${team.id}`).send({ name: 'Team Edit' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('created_at')
    expect(response.body).toHaveProperty('updated_at')
    expect(response.body).toHaveProperty('name')
    expect(response.body.name).toBe('Team Edit')

  })

  test('I expect the request to be rejected when the name is numbers', async () => {
    const response = await request(app).patch(`/team/${team.id}`).send({ name: 123 })

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Invalid payload')
    expect(response.body).toHaveProperty('statusCode')
    expect(response.body).toHaveProperty('error')

  })

  test('I expect the request to be rejected when the name is array', async () => {
    const response = await request(app).patch(`/team/${team.id}`).send({ name: [1, 'a'] })

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Invalid payload')
    expect(response.body).toHaveProperty('statusCode')
    expect(response.body).toHaveProperty('error')

  })

  test('I expect the request to be rejected when the id does not exist', async () => {
    const response = await request(app).patch(`/team/fake-id`).send({ name: 'Team Edit' })

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('statusCode')
    expect(response.body.message).toBe('Team not found')

  })


})