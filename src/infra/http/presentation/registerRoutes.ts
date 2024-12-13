import { Express } from 'express'
import championshipRouter from './championship/routers/championship.router'

export const registerRoutes = (app: Express): void => {

  app.use(`/${championshipRouter.prefix}`, championshipRouter.registerRoute())

}
