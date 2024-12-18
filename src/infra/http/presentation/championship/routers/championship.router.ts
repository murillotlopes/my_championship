import { Router } from 'express'
import { Route } from '../../shared/route'
import championshipRankingController from '../controllers/championship-ranking.controller'
import createChampionshipController from '../controllers/create-championship.controller'
import editChampionshipController from '../controllers/edit-championship.controller'
import finalResultController from '../controllers/final-result.controller'
import quarterFinalResultController from '../controllers/quarter-final-result.controller'
import round16ResultController from '../controllers/round-16-result.controller'
import semiFinalResultController from '../controllers/semi-final-result.controller'
import thirdPlaceResultController from '../controllers/third-place-result.controller'
'../controllers/create-championship.controller'

class ChampionshipRouter extends Route {

  constructor() {
    super()
    this.prefix = 'championship'
  }

  public registerRoute(): Router {

    this.router.post('/', createChampionshipController.init.bind(this))
    this.router.patch('/:championshipId', editChampionshipController.init.bind(this))
    this.router.post('/round16/:championshipId', round16ResultController.init.bind(this))
    this.router.post('/quarter-final/:championshipId', quarterFinalResultController.init.bind(this))
    this.router.post('/semi-final/:championshipId', semiFinalResultController.init.bind(this))
    this.router.post('/third-place-playoff/:championshipId', thirdPlaceResultController.init.bind(this))
    this.router.post('/final/:championshipId', finalResultController.init.bind(this))
    this.router.get('/ranking/:championshipId', championshipRankingController.init.bind(this))

    return this.router
  }

}

export default new ChampionshipRouter()

