import request from 'supertest'
import { DataSource } from 'typeorm'
import { createChampionshipMock } from '../../../../../../mocks/__tests__/championship.mock'
import { createTeamMock } from '../../../../../../mocks/__tests__/team.mock'
import { AppDataSource } from '../../../../../database/typeorm/data-source'
import { ChampionshipEntity } from '../../../../../database/typeorm/entities/championship.entity'
import { TeamEntity } from '../../../../../database/typeorm/entities/team.entity'
import { BracketRepositoryTypeORM } from '../../../../../database/typeorm/repositories/bracket-repository.typeorm'
import { ChampionshipRepositoryTypeORM } from '../../../../../database/typeorm/repositories/championship-repository.typeorm'
import { TeamRepositoryTypeORM } from '../../../../../database/typeorm/repositories/team-repository.typeorm'
import app from '../../../../app'


describe('DrawMatches end to end tests', () => {

  let connection: DataSource
  let teamRepository: TeamRepositoryTypeORM
  let championshipRepository: ChampionshipRepositoryTypeORM
  let bracketRepository: BracketRepositoryTypeORM
  let teamList: TeamEntity[] = []
  let championship: ChampionshipEntity

  beforeAll(async () => {

    await AppDataSource.initialize().then(async (con) => {

      connection = con
      teamRepository = new TeamRepositoryTypeORM()
      championshipRepository = new ChampionshipRepositoryTypeORM()
      bracketRepository = new BracketRepositoryTypeORM()

      championship = createChampionshipMock() as ChampionshipEntity
      championship = await championshipRepository.save(championship)

      for (let i = 0; i < 8; i++) {
        let team = createTeamMock() as TeamEntity
        team = await teamRepository.save(team)
        teamList.push(team)
      }

    })

  })

  afterAll(async () => {
    await connection.destroy()
  })

  test('I expect to be defined', () => {

    expect(connection).toBeDefined()
    expect(teamRepository).toBeDefined()
    expect(championshipRepository).toBeDefined()
    expect(bracketRepository).toBeDefined()

  })

  test('I hope to create 4 competition brackets', async () => {
    const response = await request(app).post(`/bracket/draw-matches/${championship.id}`).send({ teams: teamList.map(item => item.id) })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body).toHaveLength(4)
    expect(response.body[0]).toHaveProperty('round')
    expect(response.body[0].round).toBe('quarter_final')
    expect(response.body[0]).toHaveProperty('team_a')
    expect(response.body[0]).toHaveProperty('team_b')
    expect(response.body[0]).not.toHaveProperty('id')
    expect(response.body[0]).not.toHaveProperty('created_at')
    expect(response.body[0]).not.toHaveProperty('updated_at')
    expect(response.body[0]).not.toHaveProperty('realized')
    expect(response.body[0]).not.toHaveProperty('championship')
    expect(response.body[0]).not.toHaveProperty('team_a_points')
    expect(response.body[0]).not.toHaveProperty('team_b_points')

  })


  test('I expect the request to be rejected when the tournament id does not exist', async () => {
    const response = await request(app).post(`/bracket/draw-matches/fake-id`).send({ teams: teamList.map(item => item.id) })

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('statusCode')
    expect(response.body.message).toBe('Championship not found')

  })

  test('I expect the request to be rejected when a championship is already drawn up.', async () => {

    const response = await request(app).post(`/bracket/draw-matches/${championship.id}`).send({ teams: teamList.map(item => item.id) })

    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('statusCode')
    expect(response.body.message).toBe('The championship has already been drawn')

  })

  test('I expect the request to be rejected when there are less than 8 teams submitted', async () => {

    const teams = ['123']

    const response = await request(app).post(`/bracket/draw-matches/${championship.id}`).send({ teams })

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Invalid payload')
    expect(response.body).toHaveProperty('statusCode')
    expect(response.body).toHaveProperty('error')

  })

  test('I expect the request to be rejected when the team list is empty', async () => {

    const teams = []

    const response = await request(app).post(`/bracket/draw-matches/${championship.id}`).send({ teams })

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Invalid payload')
    expect(response.body).toHaveProperty('statusCode')
    expect(response.body).toHaveProperty('error')

  })

  test('I expect the request to be rejected when there are more than 8 teams submitted', async () => {

    const teams = ['123', '123', '123', '123', '123', '123', '123', '123', '123']

    const response = await request(app).post(`/bracket/draw-matches/${championship.id}`).send({ teams })

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Invalid payload')
    expect(response.body).toHaveProperty('statusCode')
    expect(response.body).toHaveProperty('error')

  })


})