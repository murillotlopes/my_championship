import { BracketModel } from '../../core/bracket/model/bracket.model'
import { Round } from '../../core/bracket/model/round.enum'
import { BracketRepositoryInMemory } from '../../infra/database/in-memory/bracket-repository.in-memory'
import { ChampionshipRepositoryInMemory } from '../../infra/database/in-memory/championship-repository.in-memory'
import TeamRepositoryInMemory from '../../infra/database/in-memory/team-repository.in-memory'
import { createChampionshipMock } from './championship.mock'
import { createTeamMock } from './team.mock'

export const createResultChampionshipMock = async (bracketRepository: BracketRepositoryInMemory, championshipRepository: ChampionshipRepositoryInMemory, teamRepository: TeamRepositoryInMemory) => {

  let championshipMock = createChampionshipMock()
  let teamList = []

  let championship = await championshipRepository.save(championshipMock)

  for (let i = 0; i < 8; i++) {
    const team = createTeamMock()
    const teamSaved = await teamRepository.save(team)
    teamList.push(teamSaved)
  }

  let sequencePoints = [4, 1, 3, 0, 4, 3, 1, 0]
  for (let i = 0; i < 8; i += 2) {
    const bracket: BracketModel = {
      championship: championship,
      round: Round.QUARTER_FINAL,
      team_a: teamList[i],
      team_b: teamList[i + 1],
      team_a_points: sequencePoints[i],
      team_b_points: sequencePoints[i + 1]
    }
    await bracketRepository.save(bracket)
  }

  sequencePoints = [2, 2, 3, 0]
  let sequenceSemiFinal = [teamList[0], teamList[2], teamList[4], teamList[6]]
  for (let i = 0; i < 4; i += 2) {
    const bracket: BracketModel = {
      championship: championship,
      round: Round.SEMI_FINAL,
      team_a: sequenceSemiFinal[i],
      team_b: sequenceSemiFinal[i + 1],
      team_a_points: sequencePoints[i],
      team_b_points: sequencePoints[i + 1]
    }
    await bracketRepository.save(bracket)
  }

  const playoff: BracketModel = {
    championship: championship,
    round: Round.THIRD_PLACE_PLAYOFF,
    team_a: teamList[2],
    team_b: teamList[6],
    team_a_points: 0,
    team_b_points: 0
  }
  await bracketRepository.save(playoff)

  const final: BracketModel = {
    championship: championship,
    round: Round.FINAL,
    team_a: teamList[0],
    team_b: teamList[4],
    team_a_points: 5,
    team_b_points: 5
  }
  await bracketRepository.save(final)

  return { championshipSaved: championship, teamList }


}