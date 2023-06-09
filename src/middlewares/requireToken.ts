import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CustomRequest } from '../types/customRequest'

export const requireToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    const payload = jwt.verify(token as string, process.env.JWT_SECRET as jwt.Secret);

    (req as CustomRequest).uid = (payload as { uid: string }).uid

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ error })
  }
}
