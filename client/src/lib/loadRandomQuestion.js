import questions from '../assets/test/questions.json'

export default async function loadRandomQuestion () {
  const storeQuestion = questions[Math.floor(Math.random() * questions.length)]

  return {
    id: storeQuestion.id,
    title: storeQuestion.enunciado,
    explanation: storeQuestion.explicacion,
    image: require(`../assets/test/pt_img/${storeQuestion.id}.jpg`),
    answers: storeQuestion.respuestas.map(answer => ({
      id: answer.id,
      title: answer.contenido,
      isCorrect: answer.correcta
    }))
  }
}
