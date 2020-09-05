/* eslint-disable no-unused-vars */

export type User = {
  username: string
}

export type Answer = {
  id: string
  title: string
  isCorrect: boolean
}
export type Question = {
  id: string
  title: string
  explanation: string
  image: string
  answers: Answer[]
}

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
