import { BracketModel } from '../../../core/bracket/model/bracket.model';
import { Round } from '../../../core/bracket/model/round.enum';
import { RepositoryInMemory } from '../shared/repository-in-memory';
import { BracketReposoritoryPort } from './../../../core/bracket/repository/bracket-repository.port';

export class BracketRepositoryInMemory extends RepositoryInMemory<BracketModel> implements BracketReposoritoryPort<BracketModel> {

  async getChampionship(championshipId: string, round?: Round): Promise<BracketModel[]> {

    const bracketList = this.list.filter(item => item.championship.id === championshipId)

    if (!bracketList.length) throw new Error('Resource not found')

    if (!round) return bracketList

    const bracketListForRound = bracketList.filter(item => item.round === round)

    if (!bracketListForRound.length) throw new Error('Resource not found')

    return bracketListForRound

  }

}