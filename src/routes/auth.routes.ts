import { RequestHandler, Router } from 'express'
import { infoUser, login, register } from '../controllers/auth.controllers'
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
  requireToken as RequestHandler,
  infoUser as unknown as RequestHandler
)

export default router
