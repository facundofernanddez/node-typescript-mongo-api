import { error } from 'console'
import { NextFunction, Request, Response, response } from 'express'
import jwt from 'jsonwebtoken'

export interface CustomRequest extends Request {
  uid: string
}

interface TokenPayload {
  uid: number
  exp: number
  iat: number
}

const validateToken = async (token: string): Promise<TokenPayload> => {
  return await new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (error, response) => {
      if (error != null) return rej(error)
      res(response)
    })
  })
}

export const requireToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    /*  if (token == null || !token) {
      throw new Error()
    } */

    const payload = jwt.verify(token as string, process.env.JWT_SECRET as jwt.Secret, (error, decoded: TokenPayload) => {
      if (error !== null) return error
      return decoded
    });

    (req as CustomRequest).uid = (payload as CustomPayload).uid

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ error })
  }
}
