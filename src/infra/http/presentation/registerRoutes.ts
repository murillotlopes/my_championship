import { Express } from 'express'
import championshipRouter from './championship/routers/championship.router'
import teamRouter from './team/routers/team.router'

export const registerRoutes = (app: Express): void => {

  app.use(`/${championshipRouter.prefix}`, championshipRouter.registerRoute())
  app.use(`/${teamRouter.prefix}`, teamRouter.registerRoute())

}
