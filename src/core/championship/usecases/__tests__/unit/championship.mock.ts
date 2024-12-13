import { ChampionshipModel } from '../../../model/championship.model'

const getRandomUppercaseLetter = () => {
  const charCode = Math.floor(Math.random() * 26) + 65
  return String.fromCharCode(charCode)
}

export const championshipMock: ChampionshipModel = {
  name: `Championshipt ${getRandomUppercaseLetter()}${getRandomUppercaseLetter()}`
}