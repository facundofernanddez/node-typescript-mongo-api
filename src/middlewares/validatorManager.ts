import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

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

export const bodyLoginValidator = [
  body('email', 'Incorrect email')
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('password', 'incorrect password')
    .trim()
    .isLength({ min: 6 }),
  validationResultMid
]
