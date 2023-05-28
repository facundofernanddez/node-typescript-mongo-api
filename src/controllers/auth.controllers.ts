import { Request, Response } from 'express'

export const login = async (_req: Request, res: Response): Promise<void> => {
  await res.json({ message: 'ok' })
}

export const register = async (_req: Request, res: Response): Promise<void> => {
  await res.json({ message: 'ok' })
}
