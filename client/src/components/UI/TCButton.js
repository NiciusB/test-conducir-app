import React from 'react'
import PropTypes from 'prop-types'
import styles from './TCButton.module.css'

TCButton.propTypes = {
  className: PropTypes.any,
  title: PropTypes.string.isRequired,
}

export default function TCButton({ className = '', title, ...props }) {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {title}
    </button>
  )
}
