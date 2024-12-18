import { Round } from '../../../../core/bracket/model/round.enum';
import { BracketRepositoryProvider } from '../../../../core/bracket/repository/bracket-repository.provider';
import { BracketEntity } from '../entities/bracket.entity';
import { RepositoryTypeORM } from './shared/repository-typeorm';

export class BracketRepositoryTypeORM extends RepositoryTypeORM<BracketEntity> implements BracketRepositoryProvider<BracketEntity> {

  constructor() {
    super(BracketEntity)
  }

  async getChampionship(championshipId: string, round?: Round): Promise<BracketEntity[]> {

    try {

      if (round) return this.repository.find({ where: { round, championship: { id: championshipId } }, relations: { team_a: true, team_b: true } })
      return this.repository.find({ where: { championship: { id: championshipId } }, relations: { team_a: true, team_b: true } })

    } catch (error) {
      throw error
    }

  }

  async score(championshipId: string, teamId: string): Promise<number> {

    try {

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

    } catch (error) {
      throw error
    }

  }


}