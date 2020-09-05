import { Router } from 'express'

const authMiddleware = Router()
export default authMiddleware

authMiddleware.use((req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    next()
    return
  }

  const [username] = Buffer.from(authHeader.replace('Basic ', ''), 'base64').toString('utf-8').split(':')

  if (!username) {
    next()
    return
  }

  req.user = {
    username,
  }

  next()
})
