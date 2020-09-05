import React, { useState, useEffect, useCallback, useRef } from 'react'
import TestQuestionCard from './TestQuestionCard'
import useApi from '../../lib/useApi'

export default function Test() {
  const api = useApi()

  const questionsQueueRef = useRef([])
  const [, _rerender] = useState({})

  const loadOneQuestion = useCallback(() => {
    return api.get('/question').then((question) => {
      questionsQueueRef.current.push(question)

      // Preload image
      var img = new Image()
      img.src = question.image

      _rerender({})
    })
  }, [api])

  const onQuestionAnswered = useCallback(
    ({ questionID, didGuessCorrectly }) => {
      return api.post('/answer', {
        questionID,
        didGuessCorrectly,
      })
    },
    [api]
  )

  const loadNextQuestion = useCallback(() => {
    // Remove current question
    questionsQueueRef.current.shift()
    return loadOneQuestion()
  }, [loadOneQuestion])

  useEffect(() => {
    // Load two questions at the same time
    Promise.all([loadOneQuestion(), loadOneQuestion()]).catch((err) => alert(err.message))
  }, [loadOneQuestion])

  return (
    <TestQuestionCard
      question={questionsQueueRef.current[0] || null}
      onQuestionAnswered={onQuestionAnswered}
      loadNextQuestion={loadNextQuestion}
    />
  )
}
