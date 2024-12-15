import { UseCase } from '../../shared/ports/usecase';
import { TeamModel } from '../../team/model/team.model';
import { BracketModel } from '../model/bracket.model';
import { DrawMatchesInput } from '../model/draw-matches.input';
import { DrawMatchesOutput } from '../model/draw-matches.output';
import { Round } from '../model/round.enum';
import { BracketRepositoryPort } from '../repository/bracket-repository.port';

export class DrawMatchesUseCase implements UseCase {

  constructor(
    private bracketRepository: BracketRepositoryPort<BracketModel>
  ) {

  }

  public execute = async (input: DrawMatchesInput): Promise<DrawMatchesOutput[]> => {

    const shuffledTeams = this.shuffleArray(input.teams)

    for (let i = 0; i < shuffledTeams.length; i += 2) {

      const bracket: BracketModel = {
        round: Round.ROUND_OF_16,
        team_a: shuffledTeams[i],
        team_b: shuffledTeams[i + 1],
        championship: input.championship
      }

      await this.bracketRepository.save(bracket)

    }

    const round16List = await this.bracketRepository.getChampionship(input.championship.id, Round.ROUND_OF_16)

    const drawMatchesOutputList: DrawMatchesOutput[] = []

    for (const bracket of round16List) {

      const matchups: DrawMatchesOutput = {
        round: bracket.round,
        team_a: bracket.team_a,
        team_b: bracket.team_b,
      }

      drawMatchesOutputList.push(matchups)

    }

    return drawMatchesOutputList

  }

  private shuffleArray(list: TeamModel[]) {
    return list.sort(() => Math.random() - 0.5)
  }

}