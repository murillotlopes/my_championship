import { randomUUID } from 'node:crypto'
import { ChampionshipModel } from '../../core/championship/model/championship.model'
import { generateRandomUppercaseLetter } from './generateRandomUppercaseLetter'

export const createChampionshipMock = (full?: Boolean) => {

  const obj: ChampionshipModel = {
    name: `Championshipt ${generateRandomUppercaseLetter()}${generateRandomUppercaseLetter()}${generateRandomUppercaseLetter()}`
  }

  if (!full) return obj

  obj.id = randomUUID()
  obj.created_at = new Date()
  obj.updated_at = obj.created_at

  return obj

}