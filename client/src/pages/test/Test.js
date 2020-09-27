import React, { useState, useEffect, useCallback, useRef } from 'react'
import TestQuestionCard from './TestQuestionCard'
import useApi from '../../lib/useApi'
import styles from './Test.module.css'

export default function Test() {
  const api = useApi()

  const [allTimeStats, setAllTimeStats] = useState({ today: 0, total: 0 })
  useEffect(() => {
    api.get('/stats').then((stats) => {
      setAllTimeStats({
        today: stats.today,
        total: stats.total,
      })
    })
  }, [api])

  const [currentTest, setCurrentTest] = useState({ correct: 0, failed: 0 })
  useEffect(() => {
    if (currentTest.correct + currentTest.failed > 30) setCurrentTest({ correct: 0, failed: 0 })
  }, [currentTest])

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
      setAllTimeStats({ today: allTimeStats.today + 1, total: allTimeStats.total + 1 })
      setCurrentTest({
        correct: currentTest.correct + (didGuessCorrectly ? 1 : 0),
        failed: currentTest.failed + (didGuessCorrectly ? 0 : 1),
      })

      return api.post('/answer', {
        questionID,
        didGuessCorrectly,
      })
    },
    [api, currentTest, allTimeStats]
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
    <div className={styles.container}>
      <div className={styles.header}>
        <span>
          {currentTest.correct}A, {currentTest.failed}F
        </span>
        <span>
          {allTimeStats.today.toLocaleString()} hoy ({allTimeStats.total.toLocaleString()} total)
        </span>
      </div>
      <TestQuestionCard
        question={questionsQueueRef.current[0] || null}
        onQuestionAnswered={onQuestionAnswered}
        loadNextQuestion={loadNextQuestion}
      />
    </div>
  )
}
