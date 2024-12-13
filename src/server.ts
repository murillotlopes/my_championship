import app from './infra/http/app';

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})