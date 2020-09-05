import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styles from './QuestionCard.module.css'
import TCButton from './UI/TCButton'
import useAudioWinFail from '../lib/useAudioWinFail'
import TCBottomSlide from './UI/TCBottomSlide'

QuestionCard.propTypes = {
  question: PropTypes.object,
  onLoadNewQuestion: PropTypes.func
}

export default React.memo(QuestionCard)
function QuestionCard ({ question, onLoadNewQuestion }) {
  if (!question) {
    question = generatePlaceholderQuestion()
  }

  const [explanationData, setExplanationData] = useState({
    isOpen: false,
    explanation: '',
    isCorrect: false
  })

  useAudioWinFail({ shouldPlay: explanationData.isOpen, hasWon: explanationData.isCorrect })

  useEffect(() => {
    if (!explanationData.isOpen && explanationData.explanation) onLoadNewQuestion()
  }, [explanationData, onLoadNewQuestion])

  const closeExplanation = useCallback(() => setExplanationData({ ...explanationData, isOpen: false }), [explanationData])

  return (
    <div className={styles.container}>
      <img className={styles.questionImage} src={question.image} alt="" />
      <h3 className={styles.title}>{question.title}</h3>
      <div className={styles.answersList}>
        {question.answers.map(answer => {
          return <TCButton key={answer.id} onClick={() => {
            setExplanationData({
              isOpen: true,
              explanation: question.explanation,
              isCorrect: answer.isCorrect
            })
          }} title={answer.title} />
        })}
      </div>

      <TCBottomSlide
        isOpen={explanationData.isOpen}
        onRequestClose={closeExplanation}
        shouldCloseOnBackgroundClick
      >
        <div className={`${styles.explanationText} ${explanationData.isCorrect ? styles.correct : styles.wrong}`}>{explanationData.explanation}</div>
        <TCButton className={styles.explanationOkButton} onClick={closeExplanation} title={'Ok'} />
      </TCBottomSlide>
    </div>
  )
}

function generatePlaceholderQuestion () {
  const generateAnswer = () => ({
    id: Math.random() + '',
    isCorrect: false,
    title: '...'
  })
  return {
    id: Math.random() + '',
    image: '',
    title: '...',
    explanation: '...',
    answers: [generateAnswer(), generateAnswer(), generateAnswer()]
  }
}
