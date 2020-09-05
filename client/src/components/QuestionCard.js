import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './QuestionCard.module.css'
import TCButton from './UI/TCButton'
import { CSSTransition } from 'react-transition-group'
import useAudioWinFail from '../lib/useAudioWinFail'

QuestionCard.propTypes = {
  question: PropTypes.object,
  onLoadNewQuestion: PropTypes.func
}

export default function QuestionCard ({ question, onLoadNewQuestion }) {
  const [explanationData, setExplanationData] = useState({
    isShown: false,
    explanation: '',
    isCorrect: false
  })
  const transitionNodeRef = useRef(null)

  useAudioWinFail({ shouldPlay:explanationData.isShown, hasWon: explanationData.isCorrect })

  if (!question) return null

  return (
    <div className={styles.container}>
      <img className={styles.questionImage} src={question.image} alt="" />
      <h3 className={styles.title}>{question.title}</h3>
      <div className={styles.answersList}>
        {question.answers.map(answer => {
          return <TCButton key={answer.id} onClick={() => {
            setExplanationData({
              isShown: true,
              explanation: question.explanation,
              isCorrect: answer.isCorrect
            })
          }} title={answer.title} />
        })}
      </div>

      <CSSTransition
        nodeRef={transitionNodeRef}
        in={explanationData.isShown}
        timeout={200}
        unmountOnExit
        classNames={{ ...styles }}
      >
        <div className={styles.explanationRoot} ref={transitionNodeRef}>
          <div className={`${styles.explanationText} ${explanationData.isCorrect ? styles.correct : styles.wrong}`}>{explanationData.explanation}</div>
          <TCButton className={styles.explanationOkButton} onClick={() => {
            onLoadNewQuestion()
            setExplanationData({ ...explanationData, isShown: false })
          }} title={'Ok'} />
        </div>
      </CSSTransition>
    </div>
  )
}
