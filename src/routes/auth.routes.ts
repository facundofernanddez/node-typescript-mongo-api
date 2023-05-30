import { RequestHandler, Router } from 'express'
import { login, register } from '../controllers/auth.controllers'
import { body } from 'express-validator'
import { validationResultMid } from '../middlewares/validationResultsMid'

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

export default router
