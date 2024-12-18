import request from 'supertest'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../../../../../database/typeorm/data-source'
import { ChampionshipEntity } from '../../../../../database/typeorm/entities/championship.entity'
import { ChampionshipRepositoryTypeORM } from '../../../../../database/typeorm/repositories/championship-repository.typeorm'
import app from '../../../../app'

describe('DeleteChampionship end to end tests', () => {

  let connection: DataSource
  let championshipRepository: ChampionshipRepositoryTypeORM
  let championship: ChampionshipEntity

  beforeAll(async () => {

    await AppDataSource.initialize().then(async (con) => {

      connection = con
      championshipRepository = new ChampionshipRepositoryTypeORM()
      championship = new ChampionshipEntity()
      championship.name = 'Championship Test'
      championship = await championshipRepository.save(championship)
    })

  })

  afterAll(async () => {
    await connection.destroy()
  })

  test('I expect to be defined', () => {

    expect(connection).toBeDefined()
    expect(championshipRepository).toBeDefined()

  })

  test('I hope the championship returns when excluded', async () => {
    const response = await request(app).delete(`/championship/${championship.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('created_at')
    expect(response.body).toHaveProperty('updated_at')
    expect(response.body).toHaveProperty('name')
    expect(response.body.name).toBe('Championship Test')

  })

  test('I expect the request to be rejected when the id does not exist', async () => {
    const response = await request(app).delete(`/championship/fake-id`)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('statusCode')
    expect(response.body.message).toBe('Championship not found')

  })

})