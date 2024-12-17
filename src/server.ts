import { AppDataSource } from './infra/database/typeorm/data-source';
import app from './infra/http/app';

const PORT = process.env.PORT || 4000

AppDataSource.initialize().then(() => {

  console.log('Connected database')

  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
  })

}).catch(error => {
  console.error(error)
})
