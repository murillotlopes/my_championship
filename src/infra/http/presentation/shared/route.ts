import { Router } from 'express'

export abstract class Route {

  public prefix!: string
  protected router = Router()

  public abstract registerRoute(): Router

}