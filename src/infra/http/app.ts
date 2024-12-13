import compression from 'compression'
import express from 'express'
import helmet from 'helmet'


const app = express()

app.use(express.json())
app.use(express.text())
app.use(helmet())
app.use(compression())

export default app
