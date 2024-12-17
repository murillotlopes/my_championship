import { randomUUID } from 'node:crypto'
import { BracketModel } from '../../core/bracket/model/bracket.model'
import { Round } from '../../core/bracket/model/round.enum'
import { ChampionshipModel } from '../../core/championship/model/championship.model'
import { createTeamMock } from './team.mock'

export const createBracketMock = (round: Round, championship: ChampionshipModel, full?: Boolean, score?: boolean) => {

  const obj: BracketModel = {
    round: round,
    team_a: createTeamMock(true),
    team_b: createTeamMock(true),
    championship: championship,
    realized: false
  }

  if (full) {
    obj.id = randomUUID()
    obj.created_at = new Date()
    obj.updated_at = obj.created_at
  }

  if (score) {
    obj.team_a_points = Math.floor(Math.random() * (10 - 0) + 0)
    obj.team_b_points = Math.floor(Math.random() * (10 - 0) + 0)
  }

  return obj

}
