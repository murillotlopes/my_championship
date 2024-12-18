import { ChampionshipModel } from '../../core/championship/model/championship.model';
import { GeneralClassificationOutput } from '../../core/championship/model/general-classification.output';
import { TeamModel } from '../../core/team/model/team.model';

export const championshipRankingMock = (championship: ChampionshipModel, teamList: TeamModel[]) => {

  const classification: GeneralClassificationOutput = {
    championship,
    ranking: [
      {
        team_name: teamList[4].name,
        placement_ranking: 1,
        total_score: 4,
        team_registration_date: new Date(teamList[4].created_at as Date)
      },

      {
        team_name: teamList[0].name,
        placement_ranking: 2,
        total_score: 3,
        team_registration_date: new Date(teamList[0].created_at as Date)
      },

      {
        team_name: teamList[2].name,
        placement_ranking: 3,
        total_score: 3,
        team_registration_date: new Date(teamList[2].created_at as Date)
      },

      {
        team_name: teamList[6].name,
        placement_ranking: 4,
        total_score: -2,
        team_registration_date: new Date(teamList[6].created_at as Date)
      },

      {
        team_name: teamList[5].name,
        placement_ranking: 5,
        total_score: -1,
        team_registration_date: new Date(teamList[5].created_at as Date)
      },
      {
        team_name: teamList[7].name,
        placement_ranking: 6,
        total_score: -1,
        team_registration_date: new Date(teamList[7].created_at as Date)
      },
      {
        team_name: teamList[1].name,
        placement_ranking: 7,
        total_score: -3,
        team_registration_date: new Date(teamList[1].created_at as Date)
      },
      {
        team_name: teamList[3].name,
        placement_ranking: 8,
        total_score: -3,
        team_registration_date: new Date(teamList[3].created_at as Date)
      },
    ]
  }

  return classification

}