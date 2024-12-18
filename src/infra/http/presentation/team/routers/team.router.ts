import { Router } from 'express'
import { Route } from '../../shared/route'
import createTeamController from '../controllers/create-team.controller'
import editTeamController from '../controllers/edit-team.controller'
import retriveOneTeamController from '../controllers/retrive-one-team.controller'
import retriveTeamController from '../controllers/retrive-team.controller'

class TeamRouter extends Route {

  constructor() {
    super()
    this.prefix = 'team'
  }

  public registerRoute(): Router {

    this.router.post('/', createTeamController.init.bind(this))
    this.router.post('/:teamId', editTeamController.init.bind(this))
    this.router.get('/', retriveTeamController.init.bind(this))
    this.router.get('/:teamId', retriveOneTeamController.init.bind(this))

    return this.router
  }

}

export default new TeamRouter()