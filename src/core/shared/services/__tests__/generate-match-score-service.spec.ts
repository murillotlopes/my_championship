import { GenerateMatchScoreService } from '../generate-match-score.service'

describe('GenerateMatchScoreService unit tests', () => {

  let sut: GenerateMatchScoreService

  beforeAll(() => {

    sut = new GenerateMatchScoreService()

  })

  test('I expect to be defined', () => {

    expect(sut).toBeDefined()

  })

  test('I expect it to return an object with points from team A and B', async () => {

    const result = await sut.getMatchScores()

    expect(result).toBeTruthy()

    expect(result).toHaveProperty('teamA')
    expect(typeof result.teamA).toBe('number')
    expect(Number.isInteger((result.teamA))).toBe(true)

    expect(result).toHaveProperty('teamB')
    expect(typeof result.teamB).toBe('number')
    expect(Number.isInteger((result.teamB))).toBe(true)

  })

})