import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export interface CustomRequest extends Request {
  payload: string | JwtPayload
}

export const requireToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    console.log(token)

    /*  if (token == null || !token) {
      throw new Error()
    } */

    const payload = jwt.verify(token as string, process.env.JWT_SECRET as jwt.Secret)
    console.log(payload);

    (req as CustomRequest).payload = payload

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ error })
  }
}
