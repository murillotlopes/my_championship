import { Round } from '../../../../core/bracket/model/round.enum';
import { ChampionshipModel } from '../../../../core/championship/model/championship.model';
import { createBracketMock } from '../../../../mocks/__tests__/bracket.mock';
import { createChampionshipMock } from '../../../../mocks/__tests__/championship.mock';
import { BracketRepositoryInMemory } from '../bracket-repository.in-memory';


describe('BracketRepositoryInMemory unit tests', () => {

  const sut = new BracketRepositoryInMemory()
  let championship: ChampionshipModel

  beforeAll(async () => {

    championship = createChampionshipMock(true)

    for (let i = 0; i < 16; i++) {

      const obj = createBracketMock(Round.ROUND_OF_16, championship, false, true)
      await sut.save(obj)

    }

    for (let i = 0; i < 8; i++) {

      const obj = createBracketMock(Round.QUARTER_FINAL, championship, false, true)
      await sut.save(obj)

    }

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