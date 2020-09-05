import React, { useContext } from 'react'

const UserContext = React.createContext()

function userReducer(state, action) {
  switch (action.type) {
    case 'set': {
      return action.user
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, null)

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
}

export function useUserState() {
  return useContext(UserContext).state
}

export function useUserDispatch() {
  return useContext(UserContext).dispatch
}
