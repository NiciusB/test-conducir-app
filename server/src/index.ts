import './types.ts'
import * as express from 'express'
import * as path from 'path'
import * as dotenv from 'dotenv'
import * as bodyParser from 'body-parser'
import questions from './routes/questions'
import authMiddleware from './auth-middleware'
import startDatabase from './lib/db'
import importQuestionsToDB from './lib/importQuestionsToDB'

dotenv.config()

const app = express()
const port = 5015

prepareExpress()

// Start server
startDatabase()
  .then(importQuestionsToDB)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}, ${process.env.API_URL}`)
    })
  })

function prepareExpress() {
  app.disable('x-powered-by')
  app.use(bodyParser.urlencoded({ extended: true }))

  // CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
  })
  app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS')
    res.send()
  })

  // Static test images
  app.use('/image', express.static(path.join(__dirname, '..', 'assets', 'pt_img')))

  // Auth
  app.use(authMiddleware)

  // Routers
  app.use(questions)
}
