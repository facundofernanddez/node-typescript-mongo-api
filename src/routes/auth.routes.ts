import express, { RequestHandler } from 'express'
import { login, register } from '../controllers/auth.controllers'
import { body } from 'express-validator'

const router = express.Router()

router.post('/login', login as RequestHandler)

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
  register as RequestHandler)

export default router
