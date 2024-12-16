import { BracketRepositoryInMemory } from '../../../../infra/database/in-memory/bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../../../../infra/database/in-memory/championship-repository.in-memory'
import TeamRepositoryInMemory from '../../../../infra/database/in-memory/team-repository.in-memory'
import { createResultChampionshipMock } from '../../../../mocks/__tests__/create-result-championship.mock'
import { Round } from '../../../bracket/model/round.enum'
import { ChampionshipModel } from '../../../championship/model/championship.model'
import { TeamModel } from '../../../team/model/team.model'
import { DefineWinnerService } from '../define-winner.service'

describe('DefineWinnerService integration tests', () => {

  let bracketRepository: BracketRepositoryInMemory
  let championshipRepository: ChampionshipRepositoryInMemory
  let teamRepository: TeamRepositoryInMemory
  let sut: DefineWinnerService

  let championship: ChampionshipModel
  let teamList: TeamModel[]

  beforeAll(async () => {

    bracketRepository = new BracketRepositoryInMemory()
    championshipRepository = new ChampionshipRepositoryInMemory()
    teamRepository = new TeamRepositoryInMemory()
    sut = new DefineWinnerService(bracketRepository)

    const mocks = await createResultChampionshipMock(bracketRepository, championshipRepository, teamRepository)

    championship = mocks.championshipSaved
    teamList = mocks.teamList

  })

  test('I expect to be defined', () => {

    expect(bracketRepository).toBeDefined()
    expect(championshipRepository).toBeDefined()
    expect(teamRepository).toBeDefined()
    expect(sut).toBeDefined()

  })

  test('I expect that in the championship 8 bracket are saved', async () => {

    const bracketList = await bracketRepository.getChampionship(championship.id as string)

    expect(bracketList).toHaveLength(8)

  })

  test('I expect that team I wins in the final', async () => {

    const finalList = await bracketRepository.getChampionship(championship.id as string, Round.FINAL)
    const final = finalList[0]

    const team = await sut.ofTheMatch(championship.id as string, final)

    expect(finalList).toHaveLength(1)
    expect(team).toStrictEqual(teamList[4])

    finalList.forEach(async (item) => await bracketRepository.delete(item.id as string))

  })

  test('I expect team E wins the playoff game', async () => {

    const playoffList = await bracketRepository.getChampionship(championship.id as string, Round.THIRD_PLACE_PLAYOFF)
    const matchA = playoffList[0]

    const teamA = await sut.ofTheMatch(championship.id as string, matchA)

    expect(playoffList).toHaveLength(1)
    expect(teamA).toStrictEqual(teamList[2])

  })

  test('I expect team A and I are the winners of the semi final matches', async () => {

    const semiList = await bracketRepository.getChampionship(championship.id as string, Round.SEMI_FINAL)
    const matchA = semiList[0]
    const matchB = semiList[1]

    const teamA = await sut.ofTheMatch(championship.id as string, matchA)
    const teamB = await sut.ofTheMatch(championship.id as string, matchB)

    expect(semiList).toHaveLength(2)
    expect(teamA).toStrictEqual(teamList[0])
    expect(teamB).toStrictEqual(teamList[4])

    semiList.forEach(async (item) => await bracketRepository.delete(item.id as string))

  })


  test('I expect teams A, E, I and M are the winners of the quarter finals', async () => {

    const quarterList = await bracketRepository.getChampionship(championship.id as string, Round.QUARTER_FINAL)
    const matchA = quarterList[0]
    const matchB = quarterList[1]
    const matchC = quarterList[2]
    const matchD = quarterList[3]

    const teamA = await sut.ofTheMatch(championship.id as string, matchA)
    const teamB = await sut.ofTheMatch(championship.id as string, matchB)
    const teamC = await sut.ofTheMatch(championship.id as string, matchC)
    const teamD = await sut.ofTheMatch(championship.id as string, matchD)

    expect(quarterList).toHaveLength(4)
    expect(teamA).toStrictEqual(teamList[0])
    expect(teamB).toStrictEqual(teamList[2])
    expect(teamC).toStrictEqual(teamList[4])
    expect(teamD).toStrictEqual(teamList[6])


  })

})