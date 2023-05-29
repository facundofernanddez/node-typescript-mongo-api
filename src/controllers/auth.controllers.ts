import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const login = async (_req: Request, res: Response): Promise<void> => {
  await res.json({ message: 'ok' })
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  req.body()
  await res.json({ message: 'ok' })
}
