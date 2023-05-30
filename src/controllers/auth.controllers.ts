import { Request, Response } from 'express'

export const login = async (_req: Request, res: Response): Promise<void> => {
  res.json({ message: 'login' })
}

export const register = async (_req: Request, res: Response): Promise<void> => {
  res.json({ message: 'register' })
}
