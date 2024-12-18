import { randomUUID } from 'node:crypto'
import { TeamModel } from '../../core/team/model/team.model'
import { generateRandomUppercaseLetter } from './generateRandomUppercaseLetter'


export const createTeamMock = (full?: Boolean) => {

  const obj: TeamModel = {
    name: `Team ${generateRandomUppercaseLetter()}${generateRandomUppercaseLetter()}${generateRandomUppercaseLetter()}`
  }

  if (!full) return obj

  obj.id = randomUUID()
  obj.created_at = new Date()
  obj.updated_at = obj.created_at

  return obj

}