import { Router } from 'express'
import { Route } from '../../shared/route'
import championshipController from '../controllers/create-championship.controller'

class ChampionshipRouter extends Route {

  constructor() {
    super()
    this.prefix = 'championship'
  }

  public registerRoute(): Router {

    this.router.post('/', championshipController.init.bind(this))

    return this.router
  }

}

export default new ChampionshipRouter()

