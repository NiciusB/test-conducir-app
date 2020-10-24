import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './TCBottomSlide.module.css'
import { CSSTransition } from 'react-transition-group'

TCBottomSlide.propTypes = {
  children: PropTypes.any,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
  shouldCloseOnBackgroundClick: PropTypes.bool,
}

export default function TCBottomSlide({ children, isOpen, shouldCloseOnBackgroundClick = false, onRequestClose }) {
  const transitionNodeRef = useRef(null)
  const lastOpenTimestampRef = useRef(null)

  useEffect(() => {
    if (isOpen) lastOpenTimestampRef.current = Date.now()
  }, [isOpen])

  const onBackgroundClick = () => {
    if (!shouldCloseOnBackgroundClick) return
    const tsDiff = Date.now() - lastOpenTimestampRef.current
    if (tsDiff > 250) onRequestClose()
  }

  return (
    <>
      {isOpen && <div className={styles.backgroundCover} onClick={onBackgroundClick} />}
      <CSSTransition nodeRef={transitionNodeRef} in={isOpen} timeout={200} unmountOnExit classNames={{ ...styles }}>
        <div className={styles.explanationRoot} ref={transitionNodeRef}>
          {children}
        </div>
      </CSSTransition>
    </>
  )
}
