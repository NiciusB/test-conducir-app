import React, { useState, useEffect, useCallback, useRef } from 'react'
import QuestionCard from './QuestionCard'
import loadRandomQuestion from '../lib/loadRandomQuestion'

export default function Test () {
  const nextQuestionRef = useRef(null)
  const [question, setQuestion] = useState(null)

  const loadNewQuestion = useCallback(() => {
    return loadRandomQuestion().then(question => {
      setQuestion(nextQuestionRef.current)
      nextQuestionRef.current = question

      // Preload next image
      var img = new Image()
      img.src = question.image
    })
  }, [])

  useEffect(() => {
    loadNewQuestion().then(loadNewQuestion).catch(err => alert(err.message))
  }, [loadNewQuestion])

  return (
    <QuestionCard question={question} onLoadNewQuestion={loadNewQuestion} />
  )
}
