import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../swagger/swagger.json'
import { registerRoutes } from './presentation/registerRoutes'


const app = express()

app.use(express.json())
app.use(express.text())
app.use(helmet())
app.use(compression())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

registerRoutes(app)

export default app
