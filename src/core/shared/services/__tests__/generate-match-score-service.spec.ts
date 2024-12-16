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

    expect(result).toHaveProperty('teamAscore')
    expect(typeof result.teamAscore).toBe('number')
    expect(Number.isInteger((result.teamAscore))).toBe(true)

    expect(result).toHaveProperty('teamBscore')
    expect(typeof result.teamBscore).toBe('number')
    expect(Number.isInteger((result.teamBscore))).toBe(true)

  })

})