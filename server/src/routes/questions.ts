import { shuffleArray } from '../utils'
import { Router } from 'express'
import { db } from '../lib/db'
import * as asyncHandler from 'express-async-handler'
import { Question } from '../entity/Question'
import { QuestionAnswer } from '../entity/QuestionAnswer'

const router = Router()
export default router

// GET /question
router.get(
  '/question',
  asyncHandler(async (req, res) => {
    if (!req.user) {
      res.status(401).send({ error: 'Unauthenticated' })
      return
    }

    const questionAnswersSubquery = db
      .createQueryBuilder(QuestionAnswer, 'question_answer')
      .select('COUNT(question_answer.id)')
      .where('didGuessCorrectly=1')
      .andWhere('username=:username')
      .andWhere('question_answer.questionID=question.id')
    const questionsQuery = db
      .createQueryBuilder(Question, 'question')
      .addSelect(`(${questionAnswersSubquery.getQuery()}) AS correct_answers`)
      .orderBy('correct_answers ASC, RANDOM()')
      .setParameter('username', req.user.username)

    const question = await questionsQuery.getOne()

    res.send({
      ...question,
      answers: shuffleArray(question.answers),
      image: `${process.env.API_URL}/image/${question.id}.jpg`,
    })
  })
)

// GET /stats
router.get(
  '/stats',
  asyncHandler(async (req, res) => {
    if (!req.user) {
      res.status(401).send({ error: 'Unauthenticated' })
      return
    }

    const statsQuery = db
      .createQueryBuilder()
      .select('total.*, today.*')
      .addFrom((sq) => {
        return sq
          .from(QuestionAnswer, 'sq1')
          .addSelect('COUNT(*) as total')
          .where('username=:username', { username: req.user.username })
      }, 'total')
      .addFrom((sq) => {
        return sq
          .from(QuestionAnswer, 'sq2')
          .addSelect('COUNT(*) as today')
          .where('username=:username', { username: req.user.username })
          .andWhere("date(created) = date('now')")
      }, 'today')

    const stats = (await statsQuery.getRawOne()) as any

    res.send({
      today: stats.today ?? 0,
      total: stats.total ?? 0,
    })
  })
)

// POST /answer
router.post(
  '/answer',
  asyncHandler(async (req, res) => {
    if (!req.user) {
      res.status(401).send({ error: 'Unauthenticated' })
      return
    }

    const questionID: string = req.body.questionID
    if (!questionID || req.body.didGuessCorrectly === undefined) {
      res.status(400).send({ error: 'Missing data' })
      return
    }
    const didGuessCorrectly = req.body.didGuessCorrectly === 'true'

    const answer = new QuestionAnswer()
    answer.didGuessCorrectly = didGuessCorrectly
    answer.username = req.user.username
    answer.questionID = questionID

    await db.manager.save(answer)

    res.status(200).send({ ok: true })
  })
)
