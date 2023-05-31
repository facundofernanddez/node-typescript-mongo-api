import { Request, Response } from 'express'
import { User } from '../models/User'

export const login = async (_req: Request, res: Response): Promise<void> => {
  res.json({ message: 'login' })
}

export const register = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body)
  const { email, password } = req.body
  try {
    const user = new User({ email, password })
    await user.save()

    // jwt token

    res.json({ message: 'success' })
    return
  } catch (error) {
    console.log(error)
  }
}
