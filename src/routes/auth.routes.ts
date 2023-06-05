import { RequestHandler, Router } from 'express'
import { infoUser, login, logout, refreshToken, register } from '../controllers/auth.controllers'
import { requireToken } from '../middlewares/requireToken'
import { requireRefreshToken } from '../middlewares/requireRefreshToken'
import { bodyValidator } from '../middlewares/validatorManager'

const router = Router()

router.post('/login',
  [bodyValidator, login] as unknown as RequestHandler
)

router.post(
  '/register',
  [bodyValidator, register] as unknown as RequestHandler)

router.get(
  '/protected',
  [requireToken, infoUser] as unknown as RequestHandler
)

router.get(
  '/refresh',
  [requireRefreshToken, refreshToken] as unknown as RequestHandler
)

router.get('/logout', logout as RequestHandler)

export default router
