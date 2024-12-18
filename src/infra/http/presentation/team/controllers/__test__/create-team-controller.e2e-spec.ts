import request from 'supertest'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../../../../../database/typeorm/data-source'
import app from '../../../../app'

describe('CreateTeam end to end tests', () => {

  let connection: DataSource

  beforeAll(async () => {

    await AppDataSource.initialize().then(async (con) => {
      connection = con
    })

  })

  afterAll(async () => {
    await connection.destroy()
  })

  test('I expect a team is created', async () => {
    const response = await request(app).post('/team').send({ name: 'Team e2e' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('created_at')
    expect(response.body).toHaveProperty('updated_at')
    expect(response.body).toHaveProperty('name')

  })

  test('I expect the request to be rejected when the name is numbers', async () => {
    const response = await request(app).post('/team').send({ name: 123 })

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('statusCode')
    expect(response.body).toHaveProperty('error')

  })

  test('I expect the request to be rejected when the name is array', async () => {
    const response = await request(app).post('/team').send({ name: [1, 'a'] })

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('statusCode')
    expect(response.body).toHaveProperty('error')

  })


})