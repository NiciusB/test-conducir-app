import React from 'react'
import { UserContextProvider, useUserState } from './lib/user-context.js'
import Test from './pages/test/Test'
import LoginPage from './pages/login/LoginPage'

export default function App() {
  return (
    <UserContextProvider>
      <Main />
    </UserContextProvider>
  )
}

function Main() {
  const user = useUserState()
  return user ? <Test /> : <LoginPage />
}
