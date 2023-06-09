import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import { body, param, validationResult } from 'express-validator'

export const validationResultMid = async (
  req: Request,
  res: Response,
  next: NextFunction): Promise<void> => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }

  next()
}

export const paramLinkValidator = [
  param('id', 'formato no valido (express validator)')
    .trim()
    .notEmpty()
    .escape(),
  validationResultMid
]

export const bodyLinkValidator = [
  body('longLink', 'incorrect or invalid link')
    .trim()
    .notEmpty()
    .exists()
    .custom(async value => {
      try {
        if (!value.startsWith('https://')) {
          value = 'https://' + value
        }

        await axios.get(value)
        return value
      } catch (error) {
        throw new Error('Not found')
      }
    }),
  validationResultMid
]

export const bodyValidator = [
  body('email', 'Incorrect email')
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('password', 'incorrect password')
    .trim()
    .isLength({ min: 6 }),
  validationResultMid
]
