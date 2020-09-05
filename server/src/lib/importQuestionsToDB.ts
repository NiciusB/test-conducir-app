import * as fs from 'fs'
import * as path from 'path'
import { Answer, Question } from '../entity/Question'
import { db } from './db'
const questions = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'questions.json'), 'utf-8'))

export default async function importQuestionsToDB() {
  // Add new questions from store
  const additionLogs = []
  await Promise.all(
    questions.map(async (storeQuestion) => {
      const parsedAnswers: Answer[] = storeQuestion.respuestas.map((answer) => ({
        id: answer.id,
        title: answer.contenido,
        isCorrect: answer.correcta,
      }))
      const parsedQuestion = new Question()
      parsedQuestion.id = storeQuestion.id
      parsedQuestion.title = storeQuestion.enunciado
      parsedQuestion.explanation = storeQuestion.explicacion
      parsedQuestion.answers = parsedAnswers

      const dbQuestion = await db.manager.findOne(Question, parsedQuestion.id)

      if (!dbQuestion) {
        additionLogs.push(`[importQuestionsToDB] Adding new question #${parsedQuestion.id} from store`)
        await db.manager.save(parsedQuestion)
      }
    })
  )
  if (additionLogs.length < 20) {
    additionLogs.forEach((q) => console.log(q))
  } else {
    console.log(`[importQuestionsToDB] ${additionLogs.length} questions added to DB from store`)
  }

  // Warn about questions in db but not store
  const questionsInDbButNotStore = (await db.manager.find(Question)).filter(
    (q) => !questions.some((_q) => _q.id === q.id)
  )

  if (questionsInDbButNotStore.length < 20) {
    questionsInDbButNotStore.forEach((q) => {
      console.log(`[importQuestionsToDB] Question #${q.id} found in DB but not store`)
    })
  } else {
    console.log(`[importQuestionsToDB] ${questionsInDbButNotStore.length} questions found in DB but not store`)
  }
}
