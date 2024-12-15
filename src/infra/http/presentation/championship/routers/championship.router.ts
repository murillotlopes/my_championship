import { Router } from 'express'
import { Route } from '../../shared/route'
import createChampionshipController from '../controllers/create-championship.controller'
import round16ResultController from '../controllers/round-16-result.controller'
'../controllers/create-championship.controller'

class ChampionshipRouter extends Route {

  constructor() {
    super()
    this.prefix = 'championship'
  }

  public registerRoute(): Router {

    this.router.post('/', createChampionshipController.init.bind(this))
    this.router.post('/round16/:championshipId', round16ResultController.init.bind(this))

    return this.router
  }

}

export default new ChampionshipRouter()

