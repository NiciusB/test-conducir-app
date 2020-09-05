import * as core from 'express-serve-static-core'
import * as fs from 'fs'
import * as path from 'path'
import { shuffleArray } from './utils'
const questions = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'assets', 'questions.json'), 'utf-8'))

export type Answer = {
  id: string
  title: string
  isCorrect: boolean
}
export type Question = {
  id: string
  title: string
  explanation: string
  image: string
  answers: Answer[]
}

export default (app: core.Express) => {
  // GET /question
  app.get('/question', (req, res) => {
    const storeQuestion = questions[Math.floor(Math.random() * questions.length)]

    const answers: Answer[] = storeQuestion.respuestas.map(answer => ({
      id: answer.id,
      title: answer.contenido,
      isCorrect: answer.correcta
    }))

    res.send({
      id: storeQuestion.id,
      title: storeQuestion.enunciado,
      explanation: storeQuestion.explicacion,
      image: `${process.env.API_URL}/image/${storeQuestion.id}.jpg`,
      answers: shuffleArray(answers)
    } as Question)
  })
}
