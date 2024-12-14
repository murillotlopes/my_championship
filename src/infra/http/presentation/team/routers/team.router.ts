import { Router } from 'express'
import { Route } from '../../shared/route'
import createTeamController from '../controllers/create-team.controller'

class TeamRouter extends Route {

  constructor() {
    super()
    this.prefix = 'team'
  }

  public registerRoute(): Router {

    this.router.post('/', createTeamController.init.bind(this))

    return this.router
  }

}

export default new TeamRouter()