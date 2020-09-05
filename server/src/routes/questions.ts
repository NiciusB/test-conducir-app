import * as fs from 'fs'
import * as path from 'path'
import { shuffleArray } from '../utils'
import { Router } from 'express'
import { Answer, Question } from '../types'
const questions = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'questions.json'), 'utf-8'))

const router = Router()
export default router

// GET /question
router.get('/question', (req, res) => {
  if (!req.user) {
    res.status(401).send({ error: 'Unauthenticated' })
    return
  }

  const storeQuestion = questions[Math.floor(Math.random() * questions.length)]

  const answers: Answer[] = storeQuestion.respuestas.map((answer) => ({
    id: answer.id,
    title: answer.contenido,
    isCorrect: answer.correcta,
  }))

  const question: Question = {
    id: storeQuestion.id,
    title: storeQuestion.enunciado,
    explanation: storeQuestion.explicacion,
    image: `${process.env.API_URL}/image/${storeQuestion.id}.jpg`,
    answers: shuffleArray(answers),
  }

  res.send(question)
})

// POST /answer
router.post('/answer', (req, res) => {
  if (!req.user) {
    res.status(401).send({ error: 'Unauthenticated' })
    return
  }

  const questionID = req.body.questionID
  if (!questionID || req.body.didGuessCorrectly === undefined) {
    res.status(400).send({ error: 'Missing data' })
    return
  }
  const didGuessCorrectly = req.body.didGuessCorrectly === 'true'

  console.log({ user: req.user.username, questionID, didGuessCorrectly })

  res.status(200).send({ ok: true })
})
