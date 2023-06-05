import { RequestHandler, Router } from 'express'
import { infoUser, login, logout, refreshToken, register } from '../controllers/auth.controllers'
import { body } from 'express-validator'
import { validationResultMid } from '../middlewares/validationResultsMid'
import { requireToken } from '../middlewares/requireToken'

const router = Router()

router.post('/login',
  [
    body('email', 'Incorrect email')
      .trim()
      .isEmail()
      .normalizeEmail(),
    body('password', 'incorrect password')
      .trim()
      .isLength({ min: 6 })
  ],
  validationResultMid as RequestHandler,
  login as RequestHandler)

router.post(
  '/register',
  [
    body('email', 'Incorrect email')
      .trim()
      .isEmail()
      .normalizeEmail(),
    body('password', 'incorrect password')
      .trim()
      .isLength({ min: 6 })
  ],
  validationResultMid as RequestHandler,
  register as RequestHandler)

router.get(
  '/protected',
  [requireToken, infoUser] as unknown as RequestHandler
)

router.get(
  '/refresh',
  refreshToken as RequestHandler
)

router.get('/logout', logout as RequestHandler)

export default router
