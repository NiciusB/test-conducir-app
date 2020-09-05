/* eslint-disable no-unused-vars */

export type User = {
  username: string
}

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
