import * as express from 'express'
import questions from './questions'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = 5015

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS')
  res.send()
})

// Static test images
app.use('/image', express.static(path.join(__dirname, '..', 'assets', 'pt_img')))

// Router
questions(app)

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}, ${process.env.API_URL}`)
})
