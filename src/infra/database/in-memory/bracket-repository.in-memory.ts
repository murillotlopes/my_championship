import { BracketModel } from '../../../core/bracket/model/bracket.model';
import { Round } from '../../../core/bracket/model/round.enum';
import { BracketRepositoryProvider } from '../../../core/bracket/repository/bracket-repository.provider';
import { RepositoryInMemory } from './shared/repository-in-memory';

export class BracketRepositoryInMemory extends RepositoryInMemory<BracketModel> implements BracketRepositoryProvider<BracketModel> {

  async getChampionship(championshipId: string, round?: Round): Promise<BracketModel[]> {

    const bracketList = this.list.filter(item => item.championship.id === championshipId)

    if (!bracketList.length) throw new Error('Resource not found')

    if (!round) return bracketList

    const bracketListForRound = bracketList.filter(item => item.round === round)

    if (!bracketListForRound.length) throw new Error('Resource not found')

    return bracketListForRound

  }

  async score(championshipId: string, teamId: string): Promise<number> {

    let score = 0
    const championship = await this.getChampionship(championshipId)

    const filteredA = championship.filter(item => item.team_a.id === teamId)
    const filteredB = championship.filter(item => item.team_b.id === teamId)

    score += filteredA.reduce((acc, bracket) => {
      return acc + Number(bracket.team_a_points) - Number(bracket.team_b_points)
    }, 0)

    score += filteredB.reduce((acc, bracket) => {
      return acc + Number(bracket.team_b_points) - Number(bracket.team_a_points)
    }, 0)

    return score

  }

}