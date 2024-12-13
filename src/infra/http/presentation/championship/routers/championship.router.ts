import { Router } from 'express'
import championshipController from '../controllers/create-championship.controller'

class ChampionshipRouter {

  public prefix = 'championship'
  private router = Router()

  public registerRoute(): Router {

    this.router.post('/', championshipController.init.bind(this))

    return this.router
  }

}

export default new ChampionshipRouter()

