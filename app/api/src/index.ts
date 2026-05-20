import express from 'express'
import cors from 'cors'
import meetingsRouter from './routes/meetings'

const app = express()
const port = Number(process.env.PORT) || 4000

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/meetings', meetingsRouter)

app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
