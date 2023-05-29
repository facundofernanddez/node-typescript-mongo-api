import express from 'express'
import { login, register } from '../controllers/auth.controllers'
import { body } from 'express-validator'

const router = express.Router()

router.post('/login', login)

router.post(
  '/register',
  [body('email', 'Incorrect email').isEmail().normalizeEmail()],
  register)

export default router
