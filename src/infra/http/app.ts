import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import { registerRoutes } from './presentation/registerRoutes'


const app = express()

app.use(express.json())
app.use(express.text())
app.use(helmet())
app.use(compression())

registerRoutes(app)

export default app
