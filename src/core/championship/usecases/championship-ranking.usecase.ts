import { BracketModel } from '../../bracket/model/bracket.model';
import { Round } from '../../bracket/model/round.enum';
import { BracketRepositoryPort } from '../../bracket/repository/bracket-repository.port';
import { UseCase } from '../../shared/ports/usecase';
import { DefineWinnerService } from '../../shared/services/define-winner.service';
import { ChampionshipModel } from '../model/championship.model';
import { GeneralClassificationOutput } from '../model/general-classification.output';
import { RankingOutput } from '../model/ranking.output';
import { ChampionshipRepositoryPort } from './../repository/championship-repository.port';

export class ChampionshipRankingUseCase implements UseCase {

  constructor(
    private championshipRepository: ChampionshipRepositoryPort<ChampionshipModel>,
    private bracketRepository: BracketRepositoryPort<BracketModel>,
    private defineWinnerService: DefineWinnerService,
  ) { }


  public execute = async (input: string): Promise<GeneralClassificationOutput> => {

    // verificar se o campeonato existe
    const championship = await this.championshipRepository.getById(input)

    if (!championship) throw new Error('Championship not found')

    // se o campeonato foi finalizado
    const finalList = await this.bracketRepository.getChampionship(championship.id, Round.FINAL)

    if (finalList.find(item => item.team_a_points)) throw new Error('The championship has not been finalized')

    const generalClassification: GeneralClassificationOutput = {
      championship,
      ranking: []
    }

    // 1º - vencedor da final
    const final = finalList[0]
    const champion = await this.defineWinnerService.define(championship.id as string, final)
    const championScore = await this.bracketRepository.score(championship.id as string, champion.id as string)

    generalClassification.ranking.push({
      team_name: champion.name,
      total_score: championScore,
      placement_ranking: 1,
      team_registration_date: champion.created_at as Date
    })

    // 2º - segundo lugar perdedor da final
    const secondPlace = final.team_a.id === champion.id ? final.team_b : final.team_a
    const secondPlaceScore = await this.bracketRepository.score(championship.id as string, secondPlace.id as string)

    generalClassification.ranking.push({
      team_name: secondPlace.name,
      total_score: secondPlaceScore,
      placement_ranking: 2,
      team_registration_date: secondPlace.created_at as Date
    })

    // 3º - terceiro lugar vencedor do playoff
    const playoffList = await this.bracketRepository.getChampionship(champion.id as string, Round.THIRD_PLACE_PLAYOFF)
    const playoff = playoffList[0]

    const thirdPlace = await this.defineWinnerService.define(championship.id as string, playoff)
    const thirdScore = await this.bracketRepository.score(champion.id as string, thirdPlace.id)

    generalClassification.ranking.push({
      team_name: thirdPlace.name,
      total_score: thirdScore,
      placement_ranking: 3,
      team_registration_date: thirdPlace.created_at as Date
    })

    // 4º - quarto lugar perdedor do playoff
    const fourthPlace = playoff.team_a.id === thirdPlace.id ? playoff.team_b : playoff.team_a
    const fourthPlaceScore = await this.bracketRepository.score(championship.id as string, fourthPlace.id as string)

    generalClassification.ranking.push({
      team_name: fourthPlace.name,
      total_score: fourthPlaceScore,
      placement_ranking: 4,
      team_registration_date: fourthPlace.created_at as Date
    })


    // 5º - quinto, sexto, setimo e oitavo lugares perdedores das quartas de finais
    const quarterList = await this.bracketRepository.getChampionship(champion.id as string, Round.QUARTER_FINAL)
    const fromFifthToEighth: RankingOutput[] = []

    for (const bracket of quarterList) {

      const team = generalClassification.ranking.find(item => item.team_name === bracket.team_a.name) ? bracket.team_b : bracket.team_a
      const scoreTeam = await this.bracketRepository.score(champion.id as string, team.id)

      const ranking: RankingOutput = {
        team_name: team.name,
        total_score: scoreTeam,
        placement_ranking: 0,
        team_registration_date: team.created_at as Date
      }

      fromFifthToEighth.push(ranking)

    }

    fromFifthToEighth.sort((a, b) => {

      if (a.total_score > b.total_score) return 1
      if (b.total_score > a.total_score) return 1

      if (new Date(a.team_registration_date).getTime() > new Date(b.team_registration_date).getTime()) return 1
      else return -1

    })

    let ranking = 5
    fromFifthToEighth.forEach(item => {
      item.placement_ranking = ranking
      ranking++
    })

    // 6ª - nono, decimo, ..., decimo sexto lugares perdedores das quartas de finais
    const round16List = await this.bracketRepository.getChampionship(champion.id as string, Round.ROUND_OF_16)
    const fromNinthToSixteenth: RankingOutput[] = []

    for (const bracket of round16List) {
      const team = generalClassification.ranking.find(item => item.team_name === bracket.team_a.name) ? bracket.team_b : bracket.team_a
      const scoreTeam = await this.bracketRepository.score(champion.id as string, team.id)

      const ranking: RankingOutput = {
        team_name: team.name,
        total_score: scoreTeam,
        placement_ranking: 0,
        team_registration_date: team.created_at as Date
      }

      fromNinthToSixteenth.push(ranking)

    }

    fromNinthToSixteenth.sort((a, b) => {

      if (a.total_score > b.total_score) return 1
      if (b.total_score > a.total_score) return 1

      if (new Date(a.team_registration_date).getTime() > new Date(b.team_registration_date).getTime()) return 1
      else return -1

    })

    fromFifthToEighth.forEach(item => {
      item.placement_ranking = ranking
      ranking++
    })

    return generalClassification

  }

}