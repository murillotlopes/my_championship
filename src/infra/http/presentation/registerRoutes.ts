import { Express } from 'express'
import bracketRouter from './bracket/routers/bracket.router'
import championshipRouter from './championship/routers/championship.router'
import teamRouter from './team/routers/team.router'

export const registerRoutes = (app: Express): void => {

  app.use(`/${championshipRouter.prefix}`, championshipRouter.registerRoute())
  app.use(`/${teamRouter.prefix}`, teamRouter.registerRoute())
  app.use(`/${bracketRouter.prefix}`, bracketRouter.registerRoute())

}
