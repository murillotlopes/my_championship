import { Router } from 'express';
import { Route } from '../../shared/route';
import drawMatchesController from '../controllers/draw-matches.controller';

class BracketRouter extends Route {

  constructor() {
    super()
    this.prefix = 'bracket'
  }

  public registerRoute(): Router {

    this.router.post('/draw-matches/:championshipId', drawMatchesController.init.bind(this))

    return this.router
  }

}

export default new BracketRouter()