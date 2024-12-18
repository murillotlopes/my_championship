import request from 'supertest'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../../../../../database/typeorm/data-source'
import { ChampionshipEntity } from '../../../../../database/typeorm/entities/championship.entity'
import { ChampionshipRepositoryTypeORM } from '../../../../../database/typeorm/repositories/championship-repository.typeorm'
import app from '../../../../app'

describe('RetriveChampionship end to end tests', () => {

  let connection: DataSource
  let championshipRepository: ChampionshipRepositoryTypeORM
  let championship: ChampionshipEntity

  beforeAll(async () => {

    await AppDataSource.initialize().then(async (con) => {

      connection = con
      championshipRepository = new ChampionshipRepositoryTypeORM()
      championship = new ChampionshipEntity()
      championship.name = 'championship Test'
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

  test('I hope it returns a list', async () => {
    const response = await request(app).get(`/championship`)

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThan(0)

  })

})