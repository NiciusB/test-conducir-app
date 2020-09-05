import React, { useState } from 'react'
import { useUserDispatch } from '../../lib/user-context'
import styles from './LoginPage.module.css'
import TCButton from '../../components/UI/TCButton'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const userDispatch = useUserDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    if (username.length === 0) return

    userDispatch({ type: 'set', user: { username } })
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label>
        <p>Username</p>
        <input autoFocus type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <TCButton type="submit" title="Login" />
    </form>
  )
}
