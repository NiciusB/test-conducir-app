import React, { useState, useEffect, useCallback } from 'react'
import QuestionCard from './QuestionCard'
import loadRandomQuestion from '../lib/loadRandomQuestion'

export default function Test () {
  const [question, setQuestion] = useState()

  const loadNewQuestion = useCallback(() => {
    loadRandomQuestion().then(setQuestion).catch(err => alert(err.message))
  }, [])

  useEffect(() => {
    loadNewQuestion()
  }, [loadNewQuestion])

  return (
    <QuestionCard question={question} onLoadNewQuestion={loadNewQuestion} />
  )
}
